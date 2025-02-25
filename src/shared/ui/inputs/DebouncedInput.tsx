import type React from 'react';

import { useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';

type Props = React.ComponentProps<'input'> & {
  throttleTimeout?: number;
  onChangeThrottled?: (value: string) => void;
};

const DebouncedInput = ({
  throttleTimeout = 300, // Default throttle timeout
  value,
  onChangeThrottled,
  onChange,
  ...rest
}: Props) => {
  const [innerValue, setInnerValue] = useState(value);
  const lastTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const changeThrottled = useRef(onChangeThrottled);
  const isUserTyping = useRef(false);

  // Update references to avoid closures in useEffect
  useEffect(() => {
    changeThrottled.current = onChangeThrottled;
  }, [onChangeThrottled]);

  // Handle external value changes
  useEffect(() => {
    if (!isUserTyping.current) {
      setInnerValue(value);
    }
  }, [value]);

  // Manage input throttling
  useEffect(() => {
    if (lastTimeoutId.current) {
      clearTimeout(lastTimeoutId.current);
    }

    lastTimeoutId.current = setTimeout(() => {
      changeThrottled.current?.(innerValue as string);
      isUserTyping.current = false;
    }, throttleTimeout);

    // Cleanup the timeout when component unmounts or value changes
    return () => {
      if (lastTimeoutId.current) {
        clearTimeout(lastTimeoutId.current);
      }
    };
  }, [innerValue, throttleTimeout]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e); // Call original onChange handler if provided
    const newValue = e.target.value;

    setInnerValue(newValue);
    isUserTyping.current = true;
  };

  return <Input {...rest} value={innerValue} onChange={handleInputChange} />;
};

export default DebouncedInput;

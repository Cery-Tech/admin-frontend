import type { NumericFormatProps } from 'react-number-format';

import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';

import { Input } from '@/components/ui/input';

type InputProps = React.ComponentProps<typeof Input>;

export const NumberInput = forwardRef<
  HTMLInputElement,
  NumericFormatProps<InputProps> & { onlyPositive?: boolean; onChangeVal?: (value: string) => void }
>(function NumberInput({ onlyPositive, onChangeVal, ...props }, ref) {
  return (
    <NumericFormat
      color="default"
      customInput={Input}
      onKeyDown={
        onlyPositive
          ? (e) => {
              props.onKeyDown?.(e);
              if (e.key === '-') {
                e.preventDefault();
              }
            }
          : undefined
      }
      {...props}
      getInputRef={ref}
      onValueChange={(val, sourceInfo) => {
        onChangeVal?.(
          onlyPositive && val.value ? Math.abs(Number(val.value)).toString() : val.value
        );
        props.onValueChange?.(val, sourceInfo);
      }}
    />
  );
});

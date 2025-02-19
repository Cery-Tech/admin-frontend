import type React from 'react';

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props = React.ComponentProps<'input'> & {
  label?: React.ReactNode;
  error?: React.ReactNode;
  description?: React.ReactNode;
  wrapperProps?: React.ComponentProps<'div'>;
};

export const TextField = ({ label, error, description, wrapperProps, ...props }: Props) => {
  return (
    <FormItem {...wrapperProps}>
      {!!label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input {...props} />
      </FormControl>
      {!!description && <FormDescription>{description}</FormDescription>}
      {!!error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};

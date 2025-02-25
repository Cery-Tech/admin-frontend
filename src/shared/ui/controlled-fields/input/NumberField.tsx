import type React from 'react';

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { NumberInput } from '../../inputs';

type Props = React.ComponentProps<typeof NumberInput> & {
  label?: React.ReactNode;
  error?: React.ReactNode;
  description?: React.ReactNode;
  wrapperProps?: React.ComponentProps<'div'>;
};

export const NumberField = ({ label, error, description, wrapperProps, ...props }: Props) => {
  return (
    <FormItem {...wrapperProps}>
      {!!label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <NumberInput {...props} />
      </FormControl>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{error}</FormMessage>
    </FormItem>
  );
};

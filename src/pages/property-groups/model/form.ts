import type { PropertyGroupCreateRequest } from '@/shared/api/property-group/types';
import type { FormPack } from '@/shared/types/forms';
import type { UseFormProps } from 'react-hook-form';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { zodSchema } from '@/shared/utils/zod';

export type PropertyGroupFormValues = PropertyGroupCreateRequest;

export type PropertyGroupFormPack = FormPack<PropertyGroupFormValues>;

const schema = zodSchema<PropertyGroupFormValues>({
  name: z.string().nonempty('Name is required'),
  rate: z.number().min(0, 'Rate must be positive'),
});

export const usePropertyGroupForm = (props?: UseFormProps<PropertyGroupFormValues>) => {
  return useForm<PropertyGroupFormValues>({
    defaultValues: {
      name: '',
      rate: 0,
    },
    resolver: zodResolver(schema),
    ...props,
  });
};

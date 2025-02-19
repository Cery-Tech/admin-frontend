import type { ManufacturerCreateRequest } from '@/shared/api/manufacturer/types';
import type { FormPack } from '@/shared/types/forms';
import type { UseFormProps } from 'react-hook-form';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { zodSchema } from '@/shared/utils/zod';

export type ManufacturerFormValues = ManufacturerCreateRequest;

export type ManufacturerFormPack = FormPack<ManufacturerFormValues>;

const schema = zodSchema<ManufacturerFormValues>({
  name: z.string().nonempty('Name is required'),
  rate: z.number().min(0, 'Rate must be positive'),
});

export const useManufacturerForm = (props?: UseFormProps<ManufacturerFormValues>) => {
  return useForm<ManufacturerFormValues>({
    defaultValues: {
      name: '',
      rate: 0,
    },
    resolver: zodResolver(schema),
    ...props,
  });
};

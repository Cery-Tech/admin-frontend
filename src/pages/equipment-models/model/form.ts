import type { ModelCreateRequest } from '@/shared/api/model/types';
import type { FormPack } from '@/shared/types/forms';
import type { UseFormProps } from 'react-hook-form';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { zodSchema } from '@/shared/utils/zod';

export type ModelFormValues = ModelCreateRequest;

export type ModelFormPack = FormPack<ModelFormValues>;

const schema = zodSchema<ModelFormValues>({
  name: z.string().nonempty('Name is required'),
  available_years: z.array(z.number()).nonempty('Available years is required'),
  manufacturer_id: z.number().positive('Manufacturer is required'),
});

export const useModelForm = (props?: UseFormProps<ModelFormValues>) => {
  return useForm<ModelFormValues>({
    defaultValues: {
      name: '',
      manufacturer_id: 0,
      available_years: [],
    },
    resolver: zodResolver(schema),
    ...props,
  });
};

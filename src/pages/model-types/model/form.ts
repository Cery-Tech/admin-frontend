import type { ModelTypeCreateRequest } from '@/shared/api/model-types/types';
import type { FormPack } from '@/shared/types/forms';
import type { UseFormProps } from 'react-hook-form';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { zodSchema } from '@/shared/utils/zod';

export type ModelTypeFormValues = ModelTypeCreateRequest;

export type ModelTypeFormPack = FormPack<ModelTypeFormValues>;

const schema = zodSchema<ModelTypeFormValues>({
  manufacturer_id: z.number().min(1, 'Manufacturer is required'),
  model_id: z.number().min(1, 'Model is required'),
  type_id: z.number().min(1, 'Type is required'),
});

export const useModelTypeForm = (props?: UseFormProps<ModelTypeFormValues>) => {
  return useForm<ModelTypeFormValues>({
    defaultValues: {
      manufacturer_id: 0,
      model_id: 0,
      type_id: 0,
    },
    resolver: zodResolver(schema),
    ...props,
  });
};

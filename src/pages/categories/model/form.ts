import type { CategoryCreateRequest } from '@/shared/api/category/types';
import type { FormPack } from '@/shared/types/forms';
import type { UseFormProps } from 'react-hook-form';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { zodSchema } from '@/shared/utils/zod';

export type CategoryFormValues = CategoryCreateRequest;

export type CategoryFormPack = FormPack<CategoryFormValues>;

const schema = zodSchema<CategoryFormValues>({
  name: z.string().nonempty('Name is required'),
  rate: z.number().min(0, 'Rate must be positive'),
  industry_id: z.number().min(1, 'Industry is required'),
});

export const useCategoryForm = (props?: UseFormProps<CategoryFormValues>) => {
  return useForm<CategoryFormValues>({
    defaultValues: {
      name: '',
      rate: 0,
      industry_id: 0,
    },
    resolver: zodResolver(schema),
    ...props,
  });
};

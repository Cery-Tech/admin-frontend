import type { IndustryCreateRequest } from '@/shared/api/industry/types';
import type { FormPack } from '@/shared/types/forms';
import type { UseFormProps } from 'react-hook-form';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { zodSchema } from '@/shared/utils/zod';

export type IndustryFormValues = IndustryCreateRequest;

export type IndustryFormPack = FormPack<IndustryFormValues>;

const schema = zodSchema<IndustryFormValues>({
  name: z.string().nonempty('Name is required'),
  rate: z.number().min(0, 'Rate must be positive'),
});

export const useIndustryForm = (props?: UseFormProps<IndustryFormValues>) => {
  return useForm<IndustryFormValues>({
    defaultValues: {
      name: '',
      rate: 0,
    },
    resolver: zodResolver(schema),
    ...props,
  });
};

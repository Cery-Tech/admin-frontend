import type { EquipmentTypeCreateRequest } from '@/shared/api/equipment-type/types';
import type { FormPack } from '@/shared/types/forms';
import type { UseFormProps } from 'react-hook-form';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { zodSchema } from '@/shared/utils/zod';

export type EquipmentTypeFormValues = EquipmentTypeCreateRequest;

export type EquipmentTypeFormPack = FormPack<EquipmentTypeFormValues>;

const schema = zodSchema<EquipmentTypeFormValues>({
  name: z.string().nonempty('Name is required'),
  rate: z.number().min(0, 'Rate must be positive'),
  industry_id: z.number().min(1, 'Industry is required'),
  category_id: z.number().min(1, 'Category is required'),
});

export const useEquipmentTypeForm = (props?: UseFormProps<EquipmentTypeFormValues>) => {
  return useForm<EquipmentTypeFormValues>({
    defaultValues: {
      name: '',
      rate: 0,
      industry_id: 0,
      category_id: 0,
    },
    resolver: zodResolver(schema),
    ...props,
  });
};

import type {
  BaseAdminProperty,
  PropertyPrarmeter,
  PropertyVariant,
} from '@/shared/api/properties/types';
import type { FormPack } from '@/shared/types/forms';
import type { WithDragProps } from '@/shared/ui/drag-and-drop';
import type { UseFormProps } from 'react-hook-form';

import { useForm } from 'react-hook-form';

import { FieldPropertyType } from '@/shared/api/properties/consts';

export type AdminPropertyFieldValues = Omit<
  BaseAdminProperty,
  'property_parameter' | 'property_variant'
> & {
  property_parameter: WithDragProps<PropertyPrarmeter>[];
  property_variant: WithDragProps<PropertyVariant>[];
};

export type AdminPropertyFormPack = FormPack<AdminPropertyFieldValues>;

export const adminPropertyFormDefaultValues: AdminPropertyFieldValues = {
  group_id: 0,
  kind: FieldPropertyType.TEXT,
  name: '',
  property_parameter: [],
  property_type: [],
  property_variant: [],
  rate: 0,
};

export const useAdminPropertyForm = (props?: UseFormProps<AdminPropertyFieldValues>) => {
  return useForm<AdminPropertyFieldValues>({
    defaultValues: adminPropertyFormDefaultValues,
    ...props,
  });
};

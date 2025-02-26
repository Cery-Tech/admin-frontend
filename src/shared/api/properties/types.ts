import type { EquipmentType } from '../equipment-type/types';
import type { FieldPropertyType } from './consts';

export type PropertyVariant = {
  value?: string;
  variant_id?: number;
};

export type BaseAdminProperty = {
  name?: string;
  kind?: FieldPropertyType;
  group_id?: number;
  rate?: number;
  property_type?: number[];
  property_variant?: PropertyVariant[];
  property_parameter?: PropertyPrarmeter[];
  is_filterable?: boolean;
};

export type PropertyPrarmeter = {
  parameter_id?: number;
  name?: string;
  multiplier?: number;
};

export type AdminProperty = BaseAdminProperty & {
  property_id?: number;
  created_at?: string;
};

export type AdminPropertyTableItem = AdminProperty & {
  linked_types?: EquipmentType[];
  typesText?: string;
  propertiesText?: string;
  variantsText?: string;
  group?: string;
};

export type GetPropertiesResponse = {
  property?: AdminProperty[];
};

export type CreatePropertyRequest = {
  property?: BaseAdminProperty;
};

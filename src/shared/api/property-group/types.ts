import type { NumberMap } from '@/shared/types';

export type PropertyGroup = {
  group_id: number;
  name: string;
  rate: number;
};

export type PropertyGroupListResponse = {
  property_group: PropertyGroup[];
};

export type PropertyGroupListQueryResponse = PropertyGroupListResponse & {
  propertyMap: NumberMap<PropertyGroup>;
};

export type PropertyGroupCreateRequest = {
  name: string;
  rate: number;
};

export type PropertyGroupCreateResponse = {
  property_group: PropertyGroup;
};

export type PropertyGroupDeleteRequest = {
  group_id: number;
};

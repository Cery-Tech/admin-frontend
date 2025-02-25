import type { PropertyGroup } from '@/shared/api/property-group/types';

export type PropertyGroupTableMeta = {
  onEdit?: (property: PropertyGroup) => void;
  onDelete?: (property: PropertyGroup) => void;
};

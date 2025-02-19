import type { Manufacturer } from '@/shared/api/manufacturer/types';

export type ManufacturerTableMeta = {
  onEdit?: (property: Manufacturer) => void;
  onDelete?: (property: Manufacturer) => void;
};

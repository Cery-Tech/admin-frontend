import type { Model } from '@/shared/api/model/types';

export type ModelTableItem = Model & {
  manufacturer_name: string;
  years_range: string;
};

export type ModelTableMeta = {
  onEdit?: (property: Model) => void;
  onDelete?: (property: Model) => void;
};

import type { AdminPropertyTableItem } from '@/shared/api/properties/types';

export type AdminPropertyTableMeta = {
  onEdit?: (property: AdminPropertyTableItem) => void;
  onDelete?: (property: AdminPropertyTableItem) => void;
  onToggle?: (id?: number) => void;
  getRowExpanded?: (id?: number) => boolean;
};

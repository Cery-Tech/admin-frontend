import type { Industry } from '@/shared/api/industry/types';

export type IndustryTableMeta = {
  onEdit?: (property: Industry) => void;
  onDelete?: (property: Industry) => void;
};

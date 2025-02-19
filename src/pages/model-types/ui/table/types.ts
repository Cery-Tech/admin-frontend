import type { ModelType } from '@/shared/api/model-types/types';

export type ModelTypeTableMeta = {
  onEdit?: (property: ModelType) => void;
  onDelete?: (property: ModelType) => void;
};

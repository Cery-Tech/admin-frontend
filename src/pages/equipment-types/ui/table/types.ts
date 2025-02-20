import type { EquipmentType } from '@/shared/api/equipment-type/types';

export type EquipmentTypeTableItem = EquipmentType & {
  industry_name: string;
  category_name: string;
};

export type EquipmentTypeTableMeta = {
  onEdit?: (property: EquipmentType) => void;
  onDelete?: (property: EquipmentType) => void;
};

import type { EquipmentType } from '@/shared/api/equipment-type/types';

export type EquipmentTypeTableItem = EquipmentType & {
  industry_name: string;
};

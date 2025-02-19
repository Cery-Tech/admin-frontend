export type EquipmentType = {
  type_id: number;
  name: string;
  rate: number;
};

export type EquipmentTypeListResponse = {
  type: EquipmentType[];
};

export type EquipmentTypeCreateRequest = {
  name: string;
  rate: number;
};

export type EquipmentTypeDeleteRequest = {
  type_id: number;
};

export type EquipmentType = {
  industry_id: number;
  category_id: number;
  type_id: number;
  name: string;
  number_of_listing: number;
  rate: number;
};

export type EquipmentTypeListResponse = {
  type: EquipmentType[];
};

export type EquipmentTypeCreateRequest = {
  industry_id: number;
  category_id: number;
  name: string;
  rate: number;
};

export type EquipmentTypeDeleteRequest = {
  type_id: number;
  industry_id: number;
  category_id: number;
};

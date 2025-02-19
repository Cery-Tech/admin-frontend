export type ModelType = {
  manufacturer_id: number;
  manufacturere_name: string;
  model_id: number;
  model_name: string;
  type_id: number;
  type_name: string;
};

export type ModelTypeListResponse = {
  model_type: ModelType[];
};

export type ModelTypeCreateRequest = {
  manufacturer_id: number;
  model_id: number;
  type_id: number;
};

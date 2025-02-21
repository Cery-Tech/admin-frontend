export type Model = {
  model_id: number;
  manufacturer_id: number;
  name: string;
  rate: number;
  available_years: number[];
};

export type ModelListResponse = {
  model: Model[];
};

export type ModelCreateRequest = {
  manufacturer_id: number;
  name: string;
  available_years: number[];
};

export type ModelDeleteRequest = {
  manufacturer_id: number;
  model_id: number;
};

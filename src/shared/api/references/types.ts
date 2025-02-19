export type Manufacturer = {
  id: number;
  name: string;
  models: ManufacturerModel[];
  alias: string;
};

export type ManufacturerModel = {
  id: number;
  name: string;
  available_years: number[];
};

export type ManufacturerGetResponse = {
  manufacturers: Manufacturer[];
};

export type ManufacturerHookResponse = {
  manufacturers: Manufacturer[];
  makeMap: Record<string, Manufacturer>;
  modelMap: Record<string, ManufacturerModel>;
};

export type IndustriesGetResponse = {
  industries: Industry[];
};

export type Industry = {
  id: number;
  name: string;
};

export type CategoriesGetRequest = {
  industry_id?: string | number;
};

export type CategoriesGetResponse = {
  categories: VehicleCategory[];
};

export type VehicleCategory = {
  id: number;
  name: string;
  listings_number: number;
  industry_id: number;
  alias: string;
};

export type VehicleTypesResponse = {
  types: VehicleType[];
};

export type UploadedImage = {
  id: string;
  urls: {
    thumb?: string;
    big?: string;
    mini?: string;
    origin?: string;
  };
};

export type VehicleType = {
  id: number;
  category_id: number;
  name: string;
  listings_number: number;
  alias: string;
};

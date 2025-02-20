export type Manufacturer = {
  manufacturer_id: number;
  name: string;
  rate: number;
};

export type ManufacturerListResponse = {
  manufacturer: Manufacturer[];
};

export type ManufacturerCreateRequest = {
  name: string;
  rate: number;
};

export type ManufacturerDeleteRequest = {
  manufacturer_id: number;
};

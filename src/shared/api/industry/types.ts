export type Industry = {
  industry_id: number;
  name: string;
  rate: number;
};

export type IndustryListResponse = {
  industry: Industry[];
};

export type IndustryCreateRequest = {
  name: string;
  rate: number;
};

export type IndustryDeleteRequest = {
  industry_id: number;
};

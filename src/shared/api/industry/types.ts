export type Industry = {
  industry_id: number;
  name: string;
};

export type IndustryListResponse = {
  industry: Industry[];
};

export type IndustryCreateRequest = {
  name: string;
};

export type IndustryDeleteRequest = {
  industry_id: number;
};

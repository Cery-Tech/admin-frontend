export type Category = {
  category_id: number;
  industry_id: number;
  name: string;
  rate: number;
};

export type CategoryListResponse = {
  category: Category[];
};

export type CategoryCreateRequest = {
  industry_id: number;
  name: string;
  rate: number;
};

export type CategoryDeleteRequest = {
  category_id: number;
  industry_id: number;
};

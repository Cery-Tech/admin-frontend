export type Category = {
  category_id: number;
  name: string;
  rate: number;
};

export type CategoryListResponse = {
  industry: Category[];
};

export type CategoryCreateRequest = {
  name: string;
  rate: number;
};

export type CategoryDeleteRequest = {
  category_id: number;
};

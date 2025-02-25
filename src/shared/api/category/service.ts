import type {
  Category,
  CategoryCreateRequest,
  CategoryDeleteRequest,
  CategoryListResponse,
} from './types';

import { AdminApi } from '../client';

const prefix = (path = '') => `/console/category${path}`;

class CategoryServ {
  getList = () => AdminApi.GET<CategoryListResponse>(prefix());

  create = (body: CategoryCreateRequest) => AdminApi.POST_JSON<object>(prefix(), body);

  delete = (body: CategoryDeleteRequest) => AdminApi.DELETE_JSON<object>(prefix(), body);

  update = (body: Category) => AdminApi.PUT_JSON<object>(prefix(), { category: body });
}

export const CategoryService = new CategoryServ();

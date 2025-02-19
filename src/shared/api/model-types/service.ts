import type { ModelTypeCreateRequest, ModelTypeListResponse } from './types';

import { AdminApi } from '../client';

const prefix = (path = '') => `/console/model-type${path}`;

class MTService {
  getList = () => AdminApi.GET<ModelTypeListResponse>(prefix('/list'));

  create = (body: ModelTypeCreateRequest) => AdminApi.POST_JSON<object>(prefix(), body);

  delete = (body: ModelTypeCreateRequest) => AdminApi.DELETE<object>(prefix(), { body });
}

export const ModelTypeService = new MTService();

import type { Model, ModelCreateRequest, ModelDeleteRequest, ModelListResponse } from './types';

import { AdminApi } from '../client';

const prefix = (path = '') => `/console/model${path}`;

class ModelServ {
  getList = () => AdminApi.GET<ModelListResponse>(prefix());

  create = (body: ModelCreateRequest) => AdminApi.POST_JSON<object>(prefix(), body);

  delete = (body: ModelDeleteRequest) => AdminApi.DELETE_JSON<object>(prefix(), body);

  update = (body: Model) => AdminApi.PUT_JSON<object>(prefix(), { model: body });
}

export const ModelService = new ModelServ();

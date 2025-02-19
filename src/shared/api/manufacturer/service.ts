import type {
  Manufacturer,
  ManufacturerCreateRequest,
  ManufacturerDeleteRequest,
  ManufacturerListResponse,
} from './types';

import { AdminApi } from '../client';

const prefix = (path = '') => `/console/manufacturer${path}`;

class ManufacturerServ {
  getList = () => AdminApi.GET<ManufacturerListResponse>(prefix());

  create = (body: ManufacturerCreateRequest) => AdminApi.POST_JSON<object>(prefix(), body);

  delete = (body: ManufacturerDeleteRequest) => AdminApi.DELETE<object>(prefix(), { body });

  update = (body: Manufacturer) => AdminApi.PUT_JSON<object>(prefix(), body);
}

export const ManufacturerService = new ManufacturerServ();

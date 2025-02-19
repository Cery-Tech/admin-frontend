import type {
  EquipmentType,
  EquipmentTypeCreateRequest,
  EquipmentTypeDeleteRequest,
  EquipmentTypeListResponse,
} from './types';

import { AdminApi } from '../client';

const prefix = (path = '') => `/console/type${path}`;

class EquipmentTypeServ {
  getList = () => AdminApi.GET<EquipmentTypeListResponse>(prefix());

  create = (body: EquipmentTypeCreateRequest) => AdminApi.POST_JSON<object>(prefix(), body);

  delete = (body: EquipmentTypeDeleteRequest) => AdminApi.DELETE<object>(prefix(), { body });

  update = (body: EquipmentType) => AdminApi.PUT_JSON<object>(prefix(), body);
}

export const EquipmentTypeService = new EquipmentTypeServ();

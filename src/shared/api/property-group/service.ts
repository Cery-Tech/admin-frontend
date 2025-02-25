import type {
  PropertyGroup,
  PropertyGroupCreateRequest,
  PropertyGroupCreateResponse,
  PropertyGroupDeleteRequest,
  PropertyGroupListResponse,
} from './types';

import { AdminApi } from '../client';

const prefix = (path = '') => `/console/property/group${path}`;

class PropertyGroupServ {
  getList = () => AdminApi.GET<PropertyGroupListResponse>(prefix());

  create = (body: PropertyGroupCreateRequest) =>
    AdminApi.POST_JSON<PropertyGroupCreateResponse>(prefix(), body);

  delete = (body: PropertyGroupDeleteRequest) => AdminApi.DELETE_JSON<object>(prefix(), body);

  update = (body: PropertyGroup) => AdminApi.PUT_JSON<object>(prefix(), { property_group: body });
}

export const PropertyGroupService = new PropertyGroupServ();

import type { FetchRequestInit } from '../helpers/fetch';
import type { AdminProperty, CreatePropertyRequest, GetPropertiesResponse } from './types';

import { AdminApi } from '../client';

const prefix = (path = '') => `/console/property${path}`;

class Admin {
  getFields = (options?: FetchRequestInit) => {
    return AdminApi.GET<GetPropertiesResponse>(prefix(), options);
  };

  addField = ({ property }: CreatePropertyRequest) => {
    return AdminApi.POST_JSON<object>(prefix(), { property });
  };

  updateField = ({ property }: { property: AdminProperty }) => {
    return AdminApi.PUT_JSON<object>(prefix(), { property });
  };

  deleteField = ({ property_id }: { property_id: number }) => {
    return AdminApi.DELETE_JSON<object>(prefix(), { property_id });
  };
}

export const AdminService = new Admin();

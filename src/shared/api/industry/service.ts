import type {
  Industry,
  IndustryCreateRequest,
  IndustryDeleteRequest,
  IndustryListResponse,
} from './types';

import { AdminApi } from '../client';

const prefix = (path = '') => `/console/industry${path}`;

class IndustryServ {
  getList = () => AdminApi.GET<IndustryListResponse>(prefix());

  create = (body: IndustryCreateRequest) => AdminApi.POST_JSON<object>(prefix(), body);

  delete = (body: IndustryDeleteRequest) => AdminApi.DELETE_JSON<object>(prefix(), body);

  update = (body: Industry) => AdminApi.PUT_JSON<object>(prefix(), body);
}

export const IndustryService = new IndustryServ();

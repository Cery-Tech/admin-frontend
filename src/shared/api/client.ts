import { logoutUser } from '../model/authStore';
import { ADMIN_API_URL, EQUIPMENT_API_URL, USER_API_URL } from './consts';
import { FetchHelper } from './helpers/fetch';

export const ClientApi = new FetchHelper(USER_API_URL, {
  onUnauthorized: () => {
    logoutUser();
  },
  endpointKey: 'user',
});

export const EquipmentApi = new FetchHelper(EQUIPMENT_API_URL, {
  endpointKey: 'equipment',
});

export const AdminApi = new FetchHelper(ADMIN_API_URL, {
  endpointKey: 'admin',
});

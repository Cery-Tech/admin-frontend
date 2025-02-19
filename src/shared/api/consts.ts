export const USER_API_URL = import.meta.env.VITE_USER_API_URL;
export const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const EQUIPMENT_API_URL = import.meta.env.VITE_EQUIPMENT_API_URL;

export const QueryKeys = {
  User: ['user'],

  Categories: (params?: object) => (params ? ['categories', params] : ['categories']),
  Industries: ['industries'],
  Types: ['types'],
  Manufacturers: ['manufacturers'],
  AdminProperties: ['admin-properties'],
};

export const AuthKeys = {
  token: 'Authorization',
  account: 'Account-Id',
};

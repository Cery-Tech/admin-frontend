export const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;
export const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export const QueryKeys = {
  User: ['user'],
  AdminProperties: ['admin-properties'],
};

export const AuthKeys = {
  token: 'Authorization',
  account: 'Account-Id',
};

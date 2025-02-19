// 'use server';

// import { cookies } from 'next/headers';

// import { AuthKeys } from '../consts';

export const getViewerCredentials = async () => {
  // const store = await cookies();

  // const token = store.get(AuthKeys.token)?.value ?? '';
  // const account = store.get(AuthKeys.account)?.value ?? '';

  return { token: '', account: '' };
};

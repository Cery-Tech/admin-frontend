import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { AccountService } from '../api/account/service';
import { ApiCredentials } from '../api/helpers/credentials';
import { getQueryClient } from '../api/queryClient';

type Store = {
  userId: string;
  account: string;
  token: string;
  setUserId: (userId: string) => void;
  setToken: (token: string) => void;
  setAccount: (account: string) => void;
};

export const useAuthStore = create<Store>()(
  devtools((set) => ({
    userId: '',
    token: '',
    account: '',
    setUserId: (userId) => set({ userId }, undefined, 'setUserId'),
    setToken: (token) => set({ token }, undefined, 'setUserToken'),
    setAccount: (account) => set({ account }, undefined, 'setAccount'),
  }))
);

export const invalidateAllQueries = () => {
  return getQueryClient().invalidateQueries({ exact: false }, { cancelRefetch: true });
};

export const changeViewerAccount = (account: string) => {
  useAuthStore.setState({ account });
  ApiCredentials.setAccount(account);
  invalidateAllQueries();
};

export const authorizeUser = async ({ token }: { token: string }) => {
  const setAuth = useAuthStore.setState;

  setAuth({ token });
  ApiCredentials.setToken(token);
  const accountId = useAuthStore.getState().account;

  try {
    const [user] = await Promise.all([AccountService.getUser()]);

    if (!user) {
      return;
    }
    setAuth({ userId: user.user.user_id, account: accountId });
    ApiCredentials.setAccount(accountId);
    invalidateAllQueries();
  } catch {
    return;
  }
};

export const applyAuthCredentials = (creds?: { token?: string; account?: string }) => {
  const getStore = useAuthStore.getState;

  const token = creds?.token ?? getStore().token;
  const account = creds?.account ?? getStore().account;

  useAuthStore.setState({ token, account });
};

export const getBrowserUserCredentials = () => {
  const { account, token } = ApiCredentials.cookies;

  return { token, account };
};

export const logoutUser = async () => {
  ApiCredentials.clear();
  useAuthStore.setState({ userId: '', token: '', account: '' });
  getQueryClient().clear();
};

export const useUserId = () => {
  return useAuthStore((state) => state.userId);
};

export const useAccountId = () => {
  return useAuthStore((state) => state.account) || ApiCredentials.account;
};

export const useAuthToken = () => {
  return useAuthStore((state) => state.token) || ApiCredentials.token;
};

export const useIsAuthenticated = () => {
  return useAuthStore((state) => !!state.token);
};

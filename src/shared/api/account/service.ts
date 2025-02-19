import type { AccountGetResponse, AccountListResponse, Profile, User } from './types';

import { ClientApi } from '../client';
import { ApiCredentials } from '../helpers/credentials';

class Account {
  get = async () => {
    return ClientApi.GET<AccountGetResponse>(`/account`);
  };

  getById = async (id: string) => {
    return ClientApi.GET<AccountGetResponse>(`/account/${id}`);
  };
  getList = async () => {
    return ClientApi.GET<AccountListResponse>(`/account/list`);
  };

  update = async (body: Profile) => {
    return ClientApi.PUT_JSON<object>('/account', { account: body });
  };

  updateImage = async ({ ...body }: { cover?: File; wallpaper?: File }) => {
    if (!body.cover && !body.wallpaper) {
      throw new Error('Image file not provided');
    }

    return ClientApi.POST_DATA<{
      wallpaper?: string;
      cover?: string;
    }>('/account/image', body);
  };

  deleteImage = async ({ kind }: { kind: 'wallpaper' | 'cover' }) => {
    return ClientApi.DELETE('/account/image', { params: { kind } });
  };

  create = async (body: Omit<Profile, 'user_id' | 'account_id'>) => {
    return ClientApi.POST_JSON<{ account: Profile }>('/account', { account: body });
  };

  getUser = () => {
    const token = ApiCredentials.token;

    if (!token) {
      ClientApi.unathorize();

      return;
    }

    return ClientApi.GET<{ user: User }>('/user');
  };

  updateUser = (user: User) => ClientApi.PUT_JSON<{ user: User }>('/user', { user });

  deleteUser = () => ClientApi.DELETE('/user/delete');
}

export const AccountService = new Account();

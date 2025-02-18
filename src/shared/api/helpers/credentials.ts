import type { ViewerCredentials } from '@/shared/types/app';

import { BrowserCookies } from '@/shared/utils/cookies';

import { AuthKeys } from '../consts';

class Credentials {
  private _token = '';
  private _account = '';

  constructor() {
    this._account = BrowserCookies.get(AuthKeys.account) ?? '';
    this._token = BrowserCookies.get(AuthKeys.token) ?? '';
  }

  get token() {
    return this._token;
  }

  get account() {
    return this._account;
  }

  get cookies(): ViewerCredentials {
    return {
      account: BrowserCookies.get(AuthKeys.account) ?? this.token,
      token: BrowserCookies.get(AuthKeys.token) ?? this.account,
    };
  }

  setToken = (token: string) => {
    this._token = token;

    BrowserCookies.set(AuthKeys.token, token, {
      sameSite: 'Strict',
      path: '/',
    });
  };

  setAccount = (accountId: string) => {
    this._account = accountId;

    BrowserCookies.set(AuthKeys.account, accountId, {
      sameSite: 'Strict',
      path: '/',
    });
  };

  clear = () => {
    BrowserCookies.delete(AuthKeys.account);
    BrowserCookies.delete(AuthKeys.token);
    this._account = '';
    this._token = '';
  };
}

export const ApiCredentials = new Credentials();

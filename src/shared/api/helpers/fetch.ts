import QueryString from 'qs';

import { IS_PROD } from '@/shared/constants/env';
import { isBrowser, isServer } from '@/shared/utils/browser-server';
import { BrowserCookies } from '@/shared/utils/cookies';
import { getCookieStore } from '@/shared/utils/server-cookies';

import { getViewerCredentials } from '../account/utils';
import { AuthKeys } from '../consts';
import { ApiCredentials } from './credentials';

export type FetchRequestInit = RequestInit & {
  params?: Record<string, string | number | boolean | null | string[]>;
  noAuth?: boolean;
  noAccount?: boolean;
};

export type FetchBlob = {
  blob: Blob;
  name: string;
};

export class FetchHelper {
  private _baseUrl = '';
  private _onUnauthorized: () => void;
  private _noAuth = false;
  private _noAccount = false;
  private _endpointKey = '';
  // private _env: 'client' | 'server' = 'client';

  constructor(
    baseUrl: string,
    config?: {
      onUnauthorized?: () => void;
      withoutAuth?: boolean;
      withoutAccount?: boolean;
      endpointKey?: string;
    }
  ) {
    this._baseUrl = baseUrl;
    this._onUnauthorized = config?.onUnauthorized || (() => null);
    this._noAuth = config?.withoutAuth ?? false;
    this._noAccount = config?.withoutAccount ?? false;
    this._endpointKey = config?.endpointKey ?? '';
  }

  readonly getDomain = async () => {
    if (IS_PROD) {
      return this._baseUrl;
    }

    if (!this._endpointKey) {
      return this._baseUrl;
    }

    // Next few lines of code is For debugging purposes only
    if (isServer()) {
      const storage = await getCookieStore();

      return storage?.get(this._endpointKey)?.value ?? this._baseUrl;
    }

    return BrowserCookies.get(this._endpointKey) || this._baseUrl;
  };

  pure = async (url: string, options: RequestInit = {}) => {
    const domain = await this.getDomain();

    return fetch(`${domain}${url}`, options);
  };

  JSON = async <T>(url: string, options: FetchRequestInit = {}): Promise<T> => {
    let account = '';
    let token = '';

    const applyToken = !options?.noAuth && !this._noAuth;
    const applyAccount = !options?.noAccount && !this._noAccount;

    if (isBrowser()) {
      account = applyAccount ? ApiCredentials.account : '';
      token = applyToken ? ApiCredentials.token : '';
    } else {
      const creds = await getViewerCredentials();

      account = applyAccount ? creds.account : '';
      token = applyToken ? creds.token : '';
    }

    const response = await this.pure(url, {
      ...options,
      headers: {
        ...(token ? { [AuthKeys.token]: `Bearer ${token}` } : {}),
        ...(account ? { [AuthKeys.account]: account } : {}),
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // if (this._env === 'client') {
      this._onUnauthorized();
      // }
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json();

      throw error;
    }

    return await response.json();
  };

  prepareParams = (params?: Record<string, string | number | boolean | null | string[]>) => {
    return params
      ? QueryString.stringify(params, {
          addQueryPrefix: true,
          arrayFormat: 'comma',
        })
      : '';
  };

  GET = async <T = object>(url: string, options: FetchRequestInit = {}) => {
    const params = this.prepareParams(options.params);

    return this.JSON<T>(`${url}${params}`, {
      ...options,
      method: 'GET',
    });
  };

  POST_JSON = async <T = object>(url: string, body: any, options: FetchRequestInit = {}) => {
    return this.JSON<T>(`${url}${this.prepareParams(options.params)}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  PUT_JSON = async <T = object>(url: string, body: any, options: FetchRequestInit = {}) => {
    return this.JSON<T>(`${url}${this.prepareParams(options.params)}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      method: 'PUT',
      body: JSON.stringify(body),
    });
  };

  DELETE = async <T = object>(url: string, options: FetchRequestInit = {}) => {
    const params = this.prepareParams(options.params);

    return this.JSON<T>(`${url}${params}`, {
      ...options,
      method: 'DELETE',
    });
  };

  DELETE_JSON = async <T = object>(url: string, body: any, options: FetchRequestInit = {}) => {
    return this.JSON<T>(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      method: 'DELETE',
      body: JSON.stringify(body),
    });
  };

  /**
   * Can accept blob as follows:
   * @example
   * const requestBlob = {
   *  blob: new Blob([JSON.stringify({ key: 'value' })], { type: 'application/json' }),
   * name: 'file.json',
   * };
   * Service.POST_DATA('/upload', { file: requestBlob });
   */
  POST_DATA = async <T = object>(
    url: string,
    body: any,
    options: FetchRequestInit & { withContentType?: boolean; formDataArraySymbol?: string } = {}
  ) => {
    const data: FormData = body instanceof FormData ? body : new FormData();

    if (!(body instanceof FormData)) {
      for (const key in body) {
        const value = body[key];

        if (Array.isArray(value)) {
          value.forEach((v) => {
            if ('blob' in v && 'name' in v) {
              data.append(
                `${key}${options?.formDataArraySymbol ?? ''}`,
                v.blob as Blob,
                v.name as string
              );

              return;
            }
            data.append(`${key}${options?.formDataArraySymbol ?? ''}`, v);
          });
        } else {
          if ('blob' in value && 'name' in value) {
            data.append(key, value.blob, value.name);
            continue;
          }
          data.append(key, value);
        }
      }
    }

    const headers: Record<string, string> = options.withContentType
      ? { 'Content-Type': 'multipart/form-data' }
      : {};

    return this.JSON<T>(url, {
      ...options,
      headers: {
        ...options.headers,
        ...headers,
      },
      method: 'POST',
      body: data,
    });
  };

  unathorize = () => {
    this._onUnauthorized();
  };
}

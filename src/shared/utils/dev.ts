import { IS_PROD } from '../constants/env';
import { isServer } from './browser-server';
import { BrowserCookies } from './cookies';

export const applyDevUtils = () => {
  if (IS_PROD) {
    return;
  }

  if (isServer()) {
    return;
  }

  window.setApi = (key = '', api = '') => {
    if (!key) {
      return;
    }
    if (!api) {
      BrowserCookies.delete(key);

      return;
    }
    BrowserCookies.set(key, api, { sameSite: 'Strict' });
  };
};

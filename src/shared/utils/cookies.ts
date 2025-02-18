export class CookiesHelper<Source extends { cookie: string }> {
  private source: Source;
  constructor(cookieSource: Source) {
    this.source = cookieSource;
  }

  set = (
    name: string,
    value: string,
    options: {
      expires?: Date | string | number;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'Lax' | 'Strict' | 'None';
    } = {}
  ): string => {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      const expires =
        options.expires instanceof Date
          ? options.expires.toUTCString()
          : typeof options.expires === 'number'
            ? new Date(Date.now() + options.expires).toUTCString()
            : options.expires;

      cookieString += `; expires=${expires}`;
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += `; secure`;
    }

    if (options.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`;
    }

    this.source.cookie = cookieString;

    return cookieString;
  };

  // Получение куки по имени
  get = (name: string): string | null => {
    const matches = this.source.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );

    return matches ? decodeURIComponent(matches[1]) : null;
  };

  // Удаление куки
  delete = (name: string, path = '/'): void => {
    this.set(name, '', { expires: -1, path });
  };
}

export class BrowserCookies {
  static isBrowser = (): boolean => {
    return typeof window !== 'undefined';
  };

  static set = (
    name: string,
    value: string,
    options: {
      expires?: Date | string | number;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'Lax' | 'Strict' | 'None';
    } = {}
  ): void => {
    if (!this.isBrowser()) {
      return;
    }
    const helper = new CookiesHelper(document);

    helper.set(name, value, options);
  };

  // Получение куки по имени
  static get = (name: string): string | null => {
    if (!this.isBrowser()) {
      return null;
    }

    return new CookiesHelper(document).get(name);
  };

  // Удаление куки
  static delete = (name: string, path = '/'): void => {
    if (!this.isBrowser()) {
      return;
    }

    new CookiesHelper(document).delete(name, path);
  };
}

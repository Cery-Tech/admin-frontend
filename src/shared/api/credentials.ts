export class Credentials {
  private static _token = '';
  private static _userId = '';

  static get userId() {
    return this._userId;
  }

  static get token() {
    return this._token;
  }

  static setToken(token: string) {
    this._token = token;
  }

  static setUserId(userId: string) {
    this._userId = userId;
  }
}

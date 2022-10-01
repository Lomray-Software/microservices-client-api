import type { IStorage, IStorageOptions } from './i-storage';

interface ICookieCombinedParams {
  cookie: {
    remove: (name: string, options?: Record<string, any>) => void;
    get: (name: string, options?: Record<string, any>) => string;
    set: (name: string, value: string, options?: Record<string, any>) => void;
  };
  options?: Record<string, any>;
}

/**
 * Cookie for access token and localStorage for refresh token
 */
class CookieCombined implements IStorage {
  /**
   * Cookie library
   * @private
   */
  protected readonly cookie: ICookieCombinedParams['cookie'];

  /**
   * Cookie methods options
   * @private
   */
  protected readonly options: ICookieCombinedParams['options'];

  /**
   * @constructor
   */
  constructor({ cookie, options }: ICookieCombinedParams) {
    this.cookie = cookie;
    this.options = options;
  }

  /**
   * @inheritDoc
   */
  public deleteItem(
    name: string,
    options: IStorageOptions = {},
  ): Promise<string | undefined> | void {
    if (options.isAccess) {
      return this.cookie.remove(name, this.options);
    }

    return localStorage.removeItem(name);
  }

  /**
   * @inheritDoc
   */
  public getItem(
    name: string,
    options: IStorageOptions = {},
  ): Promise<string | undefined> | string | null {
    if (options.isAccess) {
      return this.cookie.get(name, this.options);
    }

    return localStorage.getItem(name);
  }

  /**
   * @inheritDoc
   */
  public setItem(
    name: string,
    value: string,
    options: IStorageOptions = {},
  ): Promise<string | undefined> | void {
    if (options.isAccess) {
      if (value === null) {
        return this.cookie.remove(name, this.options);
      }

      return this.cookie.set(name, value, this.options);
    }

    return localStorage.setItem(name, value);
  }
}

export default CookieCombined;

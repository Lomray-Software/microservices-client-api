import type { IStorage } from './i-storage';

interface INativeSecureParams {
  secureStorage: {
    setItem: (
      name: string,
      value: string,
      options: INativeSecureParams['keychainOptions'],
    ) => Promise<string | undefined>;
    getItem: (
      name: string,
      options: INativeSecureParams['keychainOptions'],
    ) => Promise<string | undefined>;
    deleteItem: (
      name: string,
      options: INativeSecureParams['keychainOptions'],
    ) => Promise<string | undefined>;
  };
  keychainOptions?: {
    sharedPreferencesName?: string;
    keychainService?: string;
  };
}

/**
 * React native secure storage
 */
class NativeSecure implements IStorage {
  /**
   * @protected
   */
  protected readonly secureStorage: INativeSecureParams['secureStorage'];

  /**
   * @protected
   */
  protected readonly keychainOptions: INativeSecureParams['keychainOptions'];

  /**
   * @constructor
   */
  constructor({ secureStorage, keychainOptions }: INativeSecureParams) {
    this.secureStorage = secureStorage;
    this.keychainOptions = keychainOptions;
  }

  /**
   * @inheritDoc
   */
  public deleteItem(name: string): Promise<string | undefined> | void {
    return this.secureStorage.deleteItem(name, this.keychainOptions);
  }

  /**
   * @inheritDoc
   */
  public getItem(name: string): Promise<string | undefined> | string | null {
    return this.secureStorage.getItem(name, this.keychainOptions);
  }

  /**
   * @inheritDoc
   */
  public setItem(name: string, value: string): Promise<string | undefined> | void {
    if (!value) {
      return this.secureStorage.deleteItem(name, this.keychainOptions);
    }

    return this.secureStorage.setItem(name, value, this.keychainOptions);
  }
}

export default NativeSecure;

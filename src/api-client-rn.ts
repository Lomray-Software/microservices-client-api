import type { IApiClientParams } from './api-client';
import ApiClientDefault from './api-client';

interface IApiClientNativeParams extends IApiClientParams {
  secureStorage: {
    setItem: (
      name: string,
      value: string,
      options: IApiClientNativeParams['keychainOptions'],
    ) => Promise<string | undefined>;
    getItem: (
      name: string,
      options: IApiClientNativeParams['keychainOptions'],
    ) => Promise<string | undefined>;
    deleteItem: (
      name: string,
      options: IApiClientNativeParams['keychainOptions'],
    ) => Promise<string | undefined>;
  };
  keychainOptions?: {
    sharedPreferencesName?: string;
    keychainService?: string;
  };
}

/**
 * Api client for React Native
 */
class ApiClient extends ApiClientDefault {
  /**
   * @private
   */
  private readonly secureStorage: IApiClientNativeParams['secureStorage'];

  /**
   * @private
   */
  private readonly keychainOptions: IApiClientNativeParams['keychainOptions'];

  /**
   * @constructor
   */
  constructor({ secureStorage, keychainOptions, ...params }: IApiClientNativeParams) {
    super(params);
    this.secureStorage = secureStorage;
    this.keychainOptions = keychainOptions;
  }

  /**
   * Set user access token
   */
  public async setAccessToken(token: string | null): Promise<void> {
    if (!token) {
      await this.secureStorage.deleteItem(ApiClient.ACCESS_TOKEN_KEY, this.keychainOptions);

      return;
    }

    await this.secureStorage.setItem(ApiClient.ACCESS_TOKEN_KEY, token, this.keychainOptions);
  }

  /**
   * Set user refresh token
   */
  public async setRefreshToken(token: string | null): Promise<void> {
    if (!token) {
      await this.secureStorage.deleteItem(ApiClient.REFRESH_TOKEN_KEY, this.keychainOptions);

      return;
    }

    await this.secureStorage.setItem(ApiClient.REFRESH_TOKEN_KEY, token, this.keychainOptions);
  }

  /**
   * Get auth token
   * @private
   */
  protected getAccessToken(): Promise<string | undefined> {
    return this.secureStorage.getItem(ApiClient.ACCESS_TOKEN_KEY, this.keychainOptions);
  }

  /**
   * @protected
   */
  protected getRefreshToken(): Promise<string | undefined> {
    return this.secureStorage.getItem(ApiClient.REFRESH_TOKEN_KEY, this.keychainOptions);
  }
}

export default ApiClient;

import type { JwtPayload } from 'jwt-decode';
import JwtDecode from 'jwt-decode';
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
  keychainOptions: {
    sharedPreferencesName: string;
    keychainService: string;
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
   * @private
   */
  protected async getHeaders(): Promise<Record<string, any> | undefined> {
    // do not pass this to axios
    if (this.headers?.host) {
      delete this.headers.host;
    }

    const token = await this.getAuthToken();

    return {
      ...(this.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
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
  private getAuthToken(): Promise<string | undefined> {
    return this.secureStorage.getItem(ApiClient.ACCESS_TOKEN_KEY, this.keychainOptions);
  }

  /**
   * Get auth token id
   */
  public async getAuthTokenId(): Promise<string | undefined> {
    const token = await this.getAuthToken();

    if (token) {
      return JwtDecode<JwtPayload>(token).jti;
    }

    return undefined;
  }
}

export default ApiClient;

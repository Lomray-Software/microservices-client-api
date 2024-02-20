import waitFor from '@lomray/client-helpers/helpers/wait-for';
import type { IBaseException, IMicroserviceResponse } from '@lomray/microservices-types';
import type { IConstructableStore, IStore, Manager } from '@lomray/react-mobx-manager';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { JwtPayload } from 'jwt-decode';
import JwtDecode from 'jwt-decode';
import TokenCreateReturnType from './constants/token-return-type';
import type {
  ITokenRenewInput,
  ITokenRenewOutput,
} from './interfaces/authentication/methods/token/renew';
import type IUser from './interfaces/users/entities/user';
import type { IStorage } from './storages/i-storage';

export interface IApiClientReqOptions {
  isCached?: boolean;
  isSkipRenew?: boolean;
  shouldShowErrors?: boolean;
  request?: AxiosRequestConfig;
  isRepeat?: boolean;
  // Is endpoint allowed for guest
  // @TODO: Compose logic in middlewares
  isGuestAllowed?: boolean;
}

export interface IJwtPayload extends JwtPayload {
  userId?: string;
  roles?: string[];
  accessExpiresIn?: number;
}

export interface IAuthStore {
  signOut: (onSuccess?: (code?: 401 | 405) => void | Promise<void>) => Promise<void> | void;
  renewTokens: (params: ITokenRenewInput) => Promise<ITokenRenewOutput | undefined>;
  setShouldRefresh?: (shouldRefresh: boolean) => void;
  setFetching?: (isFetching: boolean) => void;
}

export interface IApiClientParams {
  apiDomain: string;
  userStore: IConstructableStore<{ user: Pick<IUser, 'id'> | null } & IStore>;
  authStore: IConstructableStore<IAuthStore & IStore>;
  storage: IStorage;
  accessTokenType?: TokenCreateReturnType;
  isClient?: boolean; // is client side (true - SPA, false - SSR backend)
  lang?: string;
  onShowError?: (error: IBaseException) => Promise<void> | void;
  onError?: (error: IBaseException) => Promise<void> | void;
  onSignOut?: (code?: 401 | 405) => Promise<void> | void;
  headers?: Record<string, any>;
  params?: {
    errorConnectionMsg?: string;
    errorInternetMsg?: string;
  };
}

export type TReqData<TRequest> =
  | { method: string; params?: TRequest }
  | { method: string; params?: TRequest }[];

/**
 * API client for React
 */
class ApiClient {
  static ACCESS_TOKEN_KEY = 'jwt-access';
  static REFRESH_TOKEN_KEY = 'refresh-token';
  static EXP_ACCESS_TOKEN_KEY = 'exp-access-token';

  /**
   * Mobx store manager
   * @protected
   */
  protected storeManager: Manager;

  /**
   * @private
   */
  protected readonly storage: IApiClientParams['storage'];

  /**
   * Client language
   * @protected
   */
  protected lang: string | undefined;

  /**
   * Request headers
   * @protected
   */
  protected readonly headers?: Record<string, any>;

  /**
   * Currently going request for refresh auth tokens
   * @protected
   */
  protected hasAuthRefresh = false;

  /**
   * Renew token data
   * @protected
   */
  protected renewTokenData: { attempts: number; resetTimerId: NodeJS.Timeout | null } = {
    attempts: 0,
    resetTimerId: null,
  };

  /**
   * @protected
   */
  protected readonly apiDomain: string;

  /**
   * @protected
   */
  protected readonly isClient: boolean | undefined;

  /**
   * @private
   */
  protected readonly accessTokenType: TokenCreateReturnType;

  /**
   * @protected
   */
  protected readonly onError: IApiClientParams['onError'];

  /**
   * Callback for show notification with error
   * @protected
   */
  protected readonly onShowError: IApiClientParams['onShowError'];

  /**
   * @protected
   */
  protected readonly onSignOut: IApiClientParams['onSignOut'];

  /**
   * @protected
   */
  protected readonly params: NonNullable<IApiClientParams['params']>;

  /**
   * @protected
   */
  protected readonly userStore: IApiClientParams['userStore'];

  /**
   * @protected
   */
  protected readonly authStore: IApiClientParams['authStore'];

  /**
   * Access token expiration
   * @protected
   */
  protected accessTokenExp?: number;

  /**
   * @constructor
   */
  constructor({
    apiDomain,
    userStore,
    authStore,
    storage,
    isClient,
    lang,
    onError,
    onShowError,
    onSignOut,
    headers,
    params,
    accessTokenType,
  }: IApiClientParams) {
    this.apiDomain = apiDomain;
    this.userStore = userStore;
    this.authStore = authStore;
    this.isClient = isClient;
    this.storage = storage;
    this.accessTokenType = accessTokenType || TokenCreateReturnType.directly;
    this.onError = onError;
    this.onShowError = onShowError;
    this.onSignOut = onSignOut;
    this.headers = headers;
    this.lang = lang;
    this.params = params || {};
  }

  /**
   * Set language
   */
  public setLanguage(lang: string): void {
    this.lang = lang;
  }

  /**
   * Get language
   */
  public getLanguage(): string | undefined {
    return this.lang;
  }

  /**
   * @private
   */
  public async getHeaders(): Promise<Record<string, any> | undefined> {
    // do not pass this to axios
    if (this.headers?.host) {
      delete this.headers.host;
    }

    const token = await this.getAccessToken();

    return {
      ...(this.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  /**
   * Set store manager
   */
  public setStoreManager(manager: Manager): void {
    this.storeManager = manager;
  }

  /**
   * Set access token expiration
   * @protected
   */
  protected setAccessTokenExp(exp?: number): void {
    this.accessTokenExp = exp;

    if (!exp) {
      void this.storage.deleteItem(ApiClient.EXP_ACCESS_TOKEN_KEY);

      return;
    }

    void this.storage.setItem(ApiClient.EXP_ACCESS_TOKEN_KEY, String(this.accessTokenExp));
  }

  /**
   * Set user access token
   * NOTE: if storage = 'cookies' only for development mode,
   * for websites in production, access token has httpOnly flag and installed via API
   */
  public async setAccessToken(token: string | null | undefined): Promise<void> {
    if (this.accessTokenType === TokenCreateReturnType.cookies || token === undefined) {
      return;
    }

    if (token === null) {
      this.setAccessTokenExp(undefined);

      await this.storage.deleteItem(ApiClient.ACCESS_TOKEN_KEY, {
        isAccess: true,
      });

      return;
    }

    await this.storage.setItem(ApiClient.ACCESS_TOKEN_KEY, token, {
      isAccess: true,
    });
  }

  /**
   * Set user refresh token
   */
  public async setRefreshToken(token: string | null): Promise<void> {
    if (!token) {
      this.setAccessTokenExp(undefined);

      await this.storage.deleteItem(ApiClient.REFRESH_TOKEN_KEY);

      return;
    }

    await this.storage.setItem(ApiClient.REFRESH_TOKEN_KEY, token);

    // set auth token expiration
    const sec = (await this.getTokenPayload({ type: 'refresh', newToken: token }))?.accessExpiresIn;

    this.setAccessTokenExp(sec ? sec + this.getTimestamp() : undefined);
  }

  /**
   * Get access token
   * @protected
   */
  public getAccessToken(): Promise<undefined | string | null> | string | null {
    return this.storage.getItem(ApiClient.ACCESS_TOKEN_KEY, {
      isAccess: true,
    });
  }

  /**
   * Get refresh token
   * @protected
   */
  protected getRefreshToken(): string | null | Promise<undefined | string> {
    return this.storage.getItem(ApiClient.REFRESH_TOKEN_KEY);
  }

  /**
   * Get token payload
   */
  public async getTokenPayload({
    type,
    newToken,
  }: {
    type?: 'access' | 'refresh';
    newToken?: string;
  }): Promise<IJwtPayload> {
    const token =
      newToken ?? (type === 'access' ? await this.getAccessToken() : await this.getRefreshToken());

    if (token) {
      return JwtDecode<IJwtPayload>(token);
    }

    return {};
  }

  /**
   * Get current timestamp
   * @protected
   */
  protected getTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * Make beautiful error message
   * @protected
   */
  protected static makeBeautifulError(error: IBaseException): void {
    const { message } = error;
    const parts = /Endpoint\sexception\s[^:]+\):\s?(.+)/.exec(message);

    error.message = parts?.[1] ?? parts?.[0] ?? message;
    error.rawMessage = message;
  }

  /**
   * Run request with blocking refresh auth tokens
   * @protected
   */
  protected async disableRenewAuthTokens<TCallback>(
    callback: () => Promise<TCallback> | TCallback,
  ): Promise<TCallback> {
    this.hasAuthRefresh = true;
    const result = await callback();

    this.hasAuthRefresh = false;

    return result;
  }

  /**
   * Renew auth tokens
   */
  public renewAuthTokens(): Promise<boolean> {
    return this.disableRenewAuthTokens(async () => {
      const { attempts, resetTimerId } = this.renewTokenData;

      // prevent some looping
      if (attempts >= 15) {
        return false;
      }

      if (resetTimerId) {
        clearTimeout(resetTimerId);
      }

      this.renewTokenData.attempts += 1;
      this.renewTokenData.resetTimerId = setTimeout(() => {
        this.renewTokenData.attempts = 0;
      }, 10000);
      const refresh = await this.getRefreshToken();

      if (refresh) {
        const result = await this.storeManager.getStore(this.authStore)!.renewTokens({
          refresh,
          returnType: this.accessTokenType,
        });

        if (result?.refresh) {
          await this.setAccessToken(result.access);
          await this.setRefreshToken(result.refresh);

          return true;
        }
      }

      return false;
    });
  }

  /**
   * Detect auth token expiration and try to renew
   * @protected
   */
  protected async updateAuthTokens(error: IBaseException): Promise<boolean> {
    if (![401, 405].includes(error.status)) {
      return false;
    }

    // Method not allowed
    if (error.status === 405 && error.code === -33501) {
      const payloadUserId = error.payload?.['userId'];
      const currentUserId = this.storeManager.getStore(this.userStore)?.user?.id;

      if (payloadUserId !== currentUserId) {
        // Maybe access token not exist, need logout
        await this.disableRenewAuthTokens(() =>
          this.storeManager.getStore(this.authStore)!.signOut(() => this.onSignOut?.(405)),
        );
      }

      return false;
    }

    if (!this.isClient) {
      const authStore = this.storeManager.getStore(this.authStore);

      // Pass flag to client side for update auth tokens & user
      authStore?.setShouldRefresh?.(true);
      authStore?.setFetching?.(true);

      return false;
    }

    // hold this request (this is parallel request) and wait until previous request refresh auth tokens
    if (this.hasAuthRefresh) {
      return waitFor(
        () => !this.hasAuthRefresh,
        () => true,
      );
    }

    // Access token expired and we need renew it
    if (await this.renewAuthTokens()) {
      return true;
    }

    // Failed to renew tokens - clear user store
    await this.disableRenewAuthTokens(() =>
      this.storeManager.getStore(this.authStore)!.signOut(() => this.onSignOut?.(401)),
    );

    return false;
  }

  /**
   * Handle network and other internal errors
   * @protected
   */
  protected handleInternalError(e: AxiosError): IBaseException {
    const { message, response, code } = e || {};
    const { errorConnectionMsg, errorInternetMsg } = this.params;
    let errMessage = message;

    // api timeout
    if (code === 'ECONNABORTED' && message.includes('timeout')) {
      errMessage = errorConnectionMsg || 'Oops, something went wrong, please try again later.';
    } else if (!response && message === 'Network Error') {
      errMessage = errorInternetMsg || 'It looks like the internet connection has been lost.';
    }

    return {
      status: response?.status ?? 0,
      code: 0,
      service: 'unknown',
      message: errMessage,
    };
  }

  /**
   * Check auth token expired and renew tokens
   * @protected
   */
  protected async checkTokenExpired(): Promise<boolean> {
    this.accessTokenExp =
      // get expiration or restore from storage (e.g. after app reload)
      this.accessTokenExp ?? Number(await this.storage.getItem(ApiClient.EXP_ACCESS_TOKEN_KEY));

    if (!this.accessTokenExp || this.getTimestamp() < this.accessTokenExp) {
      return true;
    }

    return this.updateAuthTokens({
      status: 401,
      code: 0,
      service: '',
      message: 'access token expired, manual renew access token',
    });
  }

  /**
   * Handle backend response
   * @protected
   */
  protected async handleResponse<TResponse>(
    res: TResponse,
    { shouldShowErrors, isSkipRenew, isGuestAllowed }: IApiClientReqOptions,
  ): Promise<TResponse | 401> {
    const responses = Array.isArray(res) ? res : [res];

    for (const response of responses) {
      // Common error handlers
      if (response?.error) {
        const { error } = response as { error: IBaseException };

        await this.onError?.(error);
        ApiClient.makeBeautifulError(error);

        // if api should renew tokens
        if (!isSkipRenew) {
          // If renew will fail, user will be sign outed, but for guest allowed request should be repeated
          const isRenewed = await this.updateAuthTokens(error);

          // If tokens were not renewed and method is guest allowed, or are tokens were renewed
          if (isRenewed || (!isRenewed && isGuestAllowed)) {
            // repeat previous request
            return 401;
          }
        }

        if (shouldShowErrors && this.isClient) {
          await this.onShowError?.(error);
        }
      }
    }

    return res;
  }

  /**
   * Send request to API
   */
  public async sendRequest<TResponse, TRequest>(
    reqData: TReqData<TRequest>,
    options: IApiClientReqOptions = {},
  ): Promise<IMicroserviceResponse<TResponse>> {
    const {
      request = {},
      isSkipRenew = false,
      shouldShowErrors = true,
      isRepeat = false,
      isGuestAllowed = true,
    } = options;

    try {
      if (!isSkipRenew && !isRepeat && !(await this.checkTokenExpired())) {
        throw new Error('Session has expired. Please login again.');
      }

      const { data } = await axios.request<IMicroserviceResponse<TResponse>>({
        baseURL: this.apiDomain,
        method: 'POST',
        withCredentials: this.isClient, // pass cookies
        headers: await this.getHeaders(),
        ...request,
        data: reqData,
      });

      const res = await this.handleResponse(data, {
        isSkipRenew,
        shouldShowErrors,
        isGuestAllowed,
      });

      // repeat request after update auth tokens
      if (res === 401) {
        return this.sendRequest(reqData, { ...options, isRepeat: true });
      }

      return res;
    } catch (e) {
      return {
        error: this.handleInternalError(e as AxiosError),
      };
    }
  }
}

export default ApiClient;

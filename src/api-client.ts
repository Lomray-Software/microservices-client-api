import waitFor from '@lomray/client-helpers/helpers/wait-for';
import type { IBaseException, IMicroserviceResponse } from '@lomray/microservices-types';
import type { IConstructableStore, Manager, IStore } from '@lomray/react-mobx-manager';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { JwtPayload } from 'jwt-decode';
import JwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import type Endpoints from './endpoints';
import { TokenCreateReturnType } from './interfaces/authentication/methods/token/renew';
import type IUser from './interfaces/users/entities/user';

export interface IApiClientReqOptions {
  isCached?: boolean;
  isSkipRenew?: boolean;
  shouldShowErrors?: boolean;
  request?: AxiosRequestConfig;
}

export interface IJwtPayload extends JwtPayload {
  userId?: string;
  roles?: string[];
}

export interface IAuthStore {
  signOut: (shouldRefreshPage?: boolean) => Promise<void> | void;
  setShouldRefresh?: (shouldRefresh: boolean) => void;
  setFetching: (isFetching: boolean) => void;
}

export interface IApiClientParams {
  apiDomain: string;
  userStore: IConstructableStore<{ user: IUser | null } & IStore>;
  authStore: IConstructableStore<IAuthStore & IStore>;
  isProd?: boolean;
  isClient?: boolean; // is client side (true - SPA, false - SSR backend)
  lang?: string;
  onShowError?: ((error: IBaseException) => Promise<void> | void) | undefined;
  headers?: Record<string, any>;
  params: {
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

  /**
   * API Endpoints
   * @protected
   */
  protected endpoints: Endpoints;

  /**
   * Mobx store manager
   * @protected
   */
  protected storeManager: Manager;

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
   * @protected
   */
  protected readonly isProd: boolean | undefined;

  /**
   * @protected
   */
  protected readonly onShowError: IApiClientParams['onShowError'];

  /**
   * @protected
   */
  protected readonly params: IApiClientParams['params'];

  /**
   * @protected
   */
  protected readonly userStore: IApiClientParams['userStore'];

  /**
   * @protected
   */
  protected readonly authStore: IApiClientParams['authStore'];

  /**
   * @constructor
   */
  constructor({
    apiDomain,
    userStore,
    authStore,
    isClient,
    lang,
    isProd,
    onShowError,
    headers,
    params,
  }: IApiClientParams) {
    this.apiDomain = apiDomain;
    this.userStore = userStore;
    this.authStore = authStore;
    this.isClient = isClient;
    this.isProd = isProd;
    this.onShowError = onShowError;
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
   * @private
   */
  protected getHeaders():
    | Record<string, any>
    | undefined
    | Promise<Record<string, any> | undefined> {
    // do not pass this to axios
    if (this.headers?.host) {
      delete this.headers.host;
    }

    // add authentication token only for development (if cookie not pass with request)
    if (!this.isProd && this.isClient) {
      const token: string | undefined = new Cookies().get(ApiClient.ACCESS_TOKEN_KEY);

      return {
        ...(this.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
    }

    return this.headers;
  }

  /**
   * Set API endpoints
   */
  public setEndpoints(endpoints: Endpoints): void {
    this.endpoints = endpoints;
  }

  /**
   * Set store manager
   */
  public setStoreManager(manager: Manager): void {
    this.storeManager = manager;
  }

  /**
   * Set user access token
   * NOTE: only for development mode
   */
  public setAccessToken(token: string | null | undefined): void {
    if (this.isProd || token === undefined) {
      return;
    }

    const cookies = new Cookies();

    if (token === null) {
      cookies.remove(ApiClient.ACCESS_TOKEN_KEY);

      return;
    }

    cookies.set(ApiClient.ACCESS_TOKEN_KEY, token);
  }

  /**
   * Set user refresh token
   */
  public setRefreshToken(token: string | null): void {
    if (token === null) {
      localStorage.removeItem(ApiClient.REFRESH_TOKEN_KEY);

      return;
    }

    localStorage.setItem(ApiClient.REFRESH_TOKEN_KEY, token);
  }

  /**
   * Get refresh token
   * @protected
   */
  protected static getRefreshToken(): string | null {
    return localStorage.getItem(ApiClient.REFRESH_TOKEN_KEY);
  }

  /**
   * Get refresh token payload
   */
  public static getRefreshTokenPayload(newToken?: string): IJwtPayload {
    const token = newToken ?? ApiClient.getRefreshToken();

    if (token) {
      return JwtDecode<IJwtPayload>(token);
    }

    return {};
  }

  /**
   * Make beautiful error message
   * @protected
   */
  protected static makeBeautifulError(error: IBaseException): void {
    const { message } = error;
    const parts = /Endpoint\sexception\s.+\):(.+)/.exec(message);

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
      const refresh = ApiClient.getRefreshToken();

      if (refresh) {
        const { result } = await this.endpoints.authentication.token.renew(
          {
            refresh,
            returnType: this.isProd
              ? TokenCreateReturnType.cookies
              : TokenCreateReturnType.directly,
          },
          { shouldShowErrors: false },
        );

        if (result?.refresh) {
          // eslint-disable-next-line @typescript-eslint/await-thenable
          await this.setAccessToken(result.access);
          // eslint-disable-next-line @typescript-eslint/await-thenable
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
    // Method not allowed
    if (error.status === 405 && error.code === -33501) {
      const payloadUserId = error.payload?.['userId'];
      const currentUserId = this.storeManager.getStore(this.userStore)?.user?.id;

      if (payloadUserId !== currentUserId) {
        // Maybe access token not exist, need logout
        await this.disableRenewAuthTokens(() =>
          this.storeManager.getStore(this.authStore)!.signOut(true),
        );
      }

      return false;
    }

    if (error.status !== 401) {
      return false;
    }

    if (!this.isClient) {
      const authStore = this.storeManager.getStore(this.authStore);

      // Pass flag to client side for update auth tokens & user
      authStore?.setShouldRefresh?.(true);
      authStore!.setFetching(true);

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
    await this.disableRenewAuthTokens(() => this.storeManager.getStore(this.authStore)!.signOut());

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
   * Handle backend response
   * @protected
   */
  protected async handleResponse<TResponse>(
    res: TResponse,
    { shouldShowErrors, isSkipRenew }: IApiClientReqOptions,
  ): Promise<TResponse | 401> {
    const responses = Array.isArray(res) ? res : [res];

    for (const response of responses) {
      // Common error handlers
      if (response?.error) {
        const { error } = response as { error: IBaseException };

        ApiClient.makeBeautifulError(error);

        if (!isSkipRenew && (await this.updateAuthTokens(error))) {
          // repeat previous request
          return 401;
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
    const { request = {}, isSkipRenew = false, shouldShowErrors = true } = options;

    try {
      const { data } = await axios.request<IMicroserviceResponse<TResponse>>({
        baseURL: this.apiDomain,
        method: 'POST',
        withCredentials: this.isClient, // pass cookies
        headers: await this.getHeaders(),
        ...request,
        data: reqData,
      });

      const res = await this.handleResponse(data, { isSkipRenew, shouldShowErrors });

      // repeat request after update auth tokens
      if (res === 401) {
        return this.sendRequest(reqData, options);
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

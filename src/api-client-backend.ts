import type { IMicroserviceRequest, IMicroserviceResponse } from '@lomray/microservices-types';
import type { AxiosRequestConfig } from 'axios';
import type { IApiClientReqOptions, TReqData } from './api-client';

interface IInnerRequestParams {
  shouldGenerateId?: boolean;
  reqId?: string | number;
  reqParams?: AxiosRequestConfig;
}

export interface IApplication {
  sendRequest: <TRequestParams = Record<string, any>, TResponseResult = Record<string, any>>(
    method: string,
    data?: IMicroserviceRequest<TRequestParams | Record<string, any>>['params'],
    params?: IInnerRequestParams,
  ) => Promise<IMicroserviceResponse<TResponseResult>> | any;
}

/**
 * Api client for backend (microservices)
 */
class ApiClientBackend {
  /**
   * @private
   */
  private readonly app: IApplication;

  /**
   * @constructor
   */
  constructor(app: IApplication) {
    this.app = app;
  }

  /**
   * Get current language
   * NOTE: need implement
   */
  public getLanguage(): undefined {
    return undefined;
  }

  /**
   * Send request to API
   */
  public async sendRequest<TResponse, TRequest>(
    reqData: TReqData<TRequest>,
    options: IApiClientReqOptions = {},
  ): Promise<IMicroserviceResponse<TResponse>> {
    if (Array.isArray(reqData)) {
      throw new Error('Backend API client currently not supported batch requests.');
    }

    const { method, params } = reqData;
    const { request } = options;

    const result = await this.app.sendRequest(method, params, { reqParams: request });

    return result.toJSON() as Promise<IMicroserviceResponse<TResponse>>;
  }
}

export default ApiClientBackend;

import type { IMicroserviceRequest, IMicroserviceResponse } from '@lomray/microservices-types';
import type { AxiosRequestConfig } from 'axios';
import type { IApiClientReqOptions, TReqData } from './api-client';

interface IInnerRequestParams {
  shouldGenerateId?: boolean;
  reqId?: string | number;
  reqParams?: AxiosRequestConfig;
}

interface IApplication {
  sendRequest: <TRequestParams = Record<string, any>, TResponseResult = Record<string, any>>(
    method: string,
    data?: IMicroserviceRequest<TRequestParams | Record<string, any>>['params'],
    params?: IInnerRequestParams,
  ) => Promise<IMicroserviceResponse<TResponseResult>>;
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
   * Send request to API
   */
  public sendRequest<TResponse, TRequest>(
    reqData: TReqData<TRequest>,
    options: IApiClientReqOptions = {},
  ): Promise<IMicroserviceResponse<TResponse>> {
    if (Array.isArray(reqData)) {
      throw new Error('Backend API client currently not supported batch requests.');
    }

    const { method, params } = reqData;
    const { request } = options;

    return this.app.sendRequest(method, params, { reqParams: request });
  }
}

export default ApiClientBackend;

import ucfirst from '@lomray/client-helpers/helpers/ucfirst';
import type {
  IQuery,
  ICreate,
  IView,
  IList,
  IRemove,
  IUpdate,
  IBaseException,
  IValidationErrorFields,
} from '@lomray/microservices-types';
import type { FormikErrors } from 'formik';
import type { IApiClientReqOptions } from './api-client';
import type ApiClient from './api-client';
import type ApiClientBackend from './api-client-backend';
import type IToken from './interfaces/authentication/entities/token';
import type ICookiesRemoveOutput from './interfaces/authentication/methods/cookies/remove';
import type {
  ITokenRenewInput,
  ITokenRenewOutput,
} from './interfaces/authentication/methods/token/renew';
import type IUserRole from './interfaces/authorization/entities/user-role';
import type IUserRoleMyOutput from './interfaces/authorization/methods/user-role/my';
import type {
  IUserRoleViewInput,
  IUserRoleViewOutput,
} from './interfaces/authorization/methods/user-role/view';
import type { IFile } from './interfaces/files/entities/file';
import type IFileEntity from './interfaces/files/entities/file-entity';
import type { IFileCreateInput } from './interfaces/files/methods/file/create';
import type { IFileRemoveInput, IFileRemoveOutput } from './interfaces/files/methods/file/remove';
import type {
  IEmailSendInput,
  IEmailSendOutput,
} from './interfaces/notifications/methods/email/send';
import type {
  IPhoneSendInput,
  IPhoneSendOutput,
} from './interfaces/notifications/methods/phone/send';
import type { IIdentityProvider } from './interfaces/users/entities/identity-provider';
import type IProfile from './interfaces/users/entities/profile';
import type IUser from './interfaces/users/entities/user';
import type {
  IConfirmCodeSendInput,
  IConfirmCodeSendOutput,
} from './interfaces/users/methods/confirm-code/send';
import type {
  IIdentityProviderSignInInput,
  IIdentityProviderSignInOutput,
} from './interfaces/users/methods/identity-provider/sign-in';
import type IChangePassword from './interfaces/users/methods/user/change-password';
import type { ISignInInput, ISignInOutput } from './interfaces/users/methods/user/sign-in';
import type { ISignOutInput, ISignOutOutput } from './interfaces/users/methods/user/sign-out';
import type { ISignUpInput, ISignUpOutput } from './interfaces/users/methods/user/sign-up';

interface IEndpointsCreateHandlerConfig
  extends Pick<IApiClientReqOptions, 'isCached' | 'isSkipRenew'> {}

interface IEndpointsCreateHandlerOptions
  extends Omit<IApiClientReqOptions, 'isCached' | 'isSkipRenew'> {}

type TBatchReturn<T> = { -readonly [P in keyof T]: Awaited<T[P]> };

export interface IValidationErrors<TFormValue> {
  fields?: FormikErrors<TFormValue>;
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IEndpoints {}

/**
 * Backend API endpoints
 */
class Endpoints<
  TBatchInstance extends IEndpoints = IEndpoints,
  TClient extends ApiClient | ApiClientBackend = ApiClient,
> {
  /**
   * API client
   */
  public readonly apiClient: TClient;

  /**
   * Endpoints instance for batching
   * @private
   */
  protected batchingInstance: TBatchInstance;

  /**
   * @constructor
   */
  constructor(apiClient: TClient) {
    this.apiClient = apiClient;
  }

  /**
   * Send request to API client
   */
  protected sendRequest = <TInput, TOutput>(
    method: string,
    params?: TInput,
    options?: IApiClientReqOptions,
  ) => this.apiClient.sendRequest<TOutput, TInput>({ method, params }, options);

  /**
   * Return request data for batch request
   */
  protected sendBatchRequest = <TInput>(method: string, params?: TInput) => ({
    method,
    params,
  });

  /**
   * Create endpoint handler
   */
  protected createHandler =
    <TInput, TOutput>(
      method: string,
      { isCached, isSkipRenew }: IEndpointsCreateHandlerConfig = {},
    ) =>
    <TI extends TInput = TInput, TO extends TOutput = TOutput>(
      params?: TI,
      options?: IEndpointsCreateHandlerOptions,
    ) =>
      this.sendRequest<TI, TO>(method, params, {
        isCached,
        isSkipRenew,
        ...options,
      });

  /**
   * Send batch request
   */
  public async batch<T extends readonly unknown[] | []>(
    callback: (api: TBatchInstance) => T,
  ): Promise<TBatchReturn<T>> {
    if (!this.batchingInstance) {
      // @ts-ignore
      this.batchingInstance = Object.assign(new this.constructor(this.apiClient), {
        sendRequest: this.sendBatchRequest,
      });
    }

    // data can contain also other values (not only request)
    const data = callback(this.batchingInstance) as Record<string, any>[];
    const { requests, mapping } = data.reduce(
      (res, obj: Record<string, any>, i) => {
        if (typeof obj === 'object' && obj.method) {
          res.requests.push(obj);
        }

        res.mapping[i] = res.requests.length - 1;

        return res;
      },
      { requests: [], mapping: {} },
    ) as { requests: Record<string, any>[]; mapping: Record<number, number> };

    const result = await this.apiClient.sendRequest(requests as never);

    // combine backend response and other values in the same order
    return data.map((obj, i) => {
      if (typeof obj === 'object' && obj.method) {
        return result[mapping[i]] as Record<string, any>;
      }

      return obj;
    }) as never;
  }

  /**
   * Convert API validation error response to key value object
   * Use in formik (setErrors)
   */
  public formatValidationError<TFormValue, TResValues>(
    error: IBaseException | IBaseException[],
    map: Partial<Record<keyof TResValues, keyof TFormValue>> = {},
    isOnlyMessage = false,
  ): IValidationErrors<TFormValue> {
    const groupErrors = !Array.isArray(error) ? [error] : error;
    const fields = groupErrors.reduce((errRes: Partial<TFormValue>, err) => {
      if (err?.status !== 422 || !Array.isArray(err?.payload)) {
        return errRes;
      }

      return {
        ...(errRes ?? {}),
        ...err.payload.reduce(
          (res, { property, constraints }) => ({
            ...res,
            [map?.[property] ?? property]: ucfirst(
              Object.values(constraints)
                .at(0)
                // remove field name from begin
                ?.replace(new RegExp(`^${property} `), '') ?? '',
              this.apiClient.getLanguage(),
            ),
          }),
          {} as IValidationErrorFields,
        ),
      };
    }, undefined);

    const result = {
      fields,
      message: fields === undefined ? groupErrors.at(0)?.message : undefined,
    };

    if (isOnlyMessage) {
      return { message: result.message ?? (Object.values(fields ?? {})?.[0] as string) };
    }

    return result as IValidationErrors<TFormValue>;
  }

  /**
   * Authentication microservice
   */
  authentication = {
    token: {
      renew: this.createHandler<ITokenRenewInput, ITokenRenewOutput>('authentication.token.renew', {
        isSkipRenew: true,
      }),
      update: this.createHandler<IUpdate<IToken>, IView<IToken>>('authentication.token.update'),
    },
    cookies: {
      remove: this.createHandler<never, ICookiesRemoveOutput>('authentication.cookies.remove', {
        isSkipRenew: true,
      }),
    },
  };

  /**
   * Authorization microservice
   */
  authorization = {
    userRole: {
      my: this.createHandler<never, IUserRoleMyOutput>('authorization.user-role.my'),
      view: this.createHandler<IUserRoleViewInput, IUserRoleViewOutput>(
        'authorization.user-role.view',
      ),
      remove: this.createHandler<IQuery<IUserRole>, IRemove<IUserRole>>(
        'authorization.user-role.remove',
      ),
      assign: this.createHandler<ICreate<IUserRole>, IView<IUserRole>>(
        'authorization.user-role.assign',
      ),
    },
  };

  /**
   * Users microservice
   */
  users = {
    user: {
      list: this.createHandler<IQuery<IUser>, IList<IUser>>('users.user.list'),
      me: this.createHandler<IQuery<IUser>, IView<IUser>>('users.user.me'),
      view: this.createHandler<IQuery<IUser>, IView<IUser>>('users.user.view'),
      update: this.createHandler<IUpdate<IUser>, IView<IUser>>('users.user.update'),
      changePassword: this.createHandler<IChangePassword, IView<IUser>>(
        'users.user.change-password',
      ),
      create: this.createHandler<ICreate<IUser>, IView<IUser>>('users.user.create'),
      signUp: this.createHandler<ISignUpInput, ISignUpOutput>('users.user.sign-up'),
      signIn: this.createHandler<ISignInInput, ISignInOutput>('users.user.sign-in'),
      signOut: this.createHandler<ISignOutInput, ISignOutOutput>('users.user.sign-out', {
        isSkipRenew: true,
      }),
    },
    confirmCode: {
      create: this.createHandler<IConfirmCodeSendInput, IConfirmCodeSendOutput>(
        'users.confirm-code.send',
      ),
    },
    profile: {
      update: this.createHandler<IUpdate<IProfile>, IView<IProfile>>('users.profile.update'),
    },
    identityProvider: {
      signIn: this.createHandler<IIdentityProviderSignInInput, IIdentityProviderSignInOutput>(
        'users.identity-provider.sign-in',
      ),
      list: this.createHandler<IQuery<IIdentityProvider>, IList<IIdentityProvider>>(
        'users.identity-provider.list',
      ),
      remove: this.createHandler<IQuery<IIdentityProvider>, IRemove<IIdentityProvider>>(
        'users.identity-provider.remove',
      ),
    },
  };

  /**
   * Files microservice
   */
  files = {
    file: {
      list: this.createHandler<IQuery<IFile>, IList<IFile>>('files.file.list'),
      create: this.createHandler<IFileCreateInput, IView<IFile>>('files.file.create'),
      remove: this.createHandler<IFileRemoveInput, IFileRemoveOutput>('files.file.remove'),
      view: this.createHandler<IQuery<IFile>, IView<IFile>>('files.file.view'),
    },
    fileEntity: {
      create: this.createHandler<ICreate<IFileEntity>, IView<IFileEntity>>(
        'files.file-entity.create',
      ),
      update: this.createHandler<IUpdate<IFileEntity>, IUpdate<IFileEntity>>(
        'files.file-entity.update',
      ),
      remove: this.createHandler<IQuery<IFileEntity>, IRemove<IFileEntity>>(
        'files.file-entity.remove',
      ),
      view: this.createHandler<IQuery<IFileEntity>, IView<IFileEntity>>('files.file-entity.view'),
    },
  };

  /**
   * Notification microservice
   */
  notification = {
    email: {
      send: this.createHandler<IEmailSendInput, IEmailSendOutput>('notification.email.send'),
    },
    phone: {
      send: this.createHandler<IPhoneSendInput, IPhoneSendOutput>('notification.phone.send'),
    },
  };
}

export default Endpoints;

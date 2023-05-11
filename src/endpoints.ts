import ucfirst from '@lomray/client-helpers/helpers/ucfirst';
import type {
  IQuery,
  ICreate,
  IView,
  IList,
  IRemove,
  IUpdate,
  ICount,
  IBaseException,
  IValidationErrorFields,
} from '@lomray/microservices-types';
import type { FormikErrors } from 'formik';
import type { IApiClientReqOptions } from './api-client';
import type ApiClient from './api-client';
import type ApiClientBackend from './api-client-backend';
import ErrorType from './constants/error-type';
import type IToken from './interfaces/authentication/entities/token';
import type ICookiesRemoveOutput from './interfaces/authentication/methods/cookies/remove';
import type {
  ITokenCreateInput,
  ITokenCreateOutput,
} from './interfaces/authentication/methods/token/create';
import type {
  ITokenRenewInput,
  ITokenRenewOutput,
} from './interfaces/authentication/methods/token/renew';
import type { ICondition } from './interfaces/authorization/entities/condition';
import type { IFilter } from './interfaces/authorization/entities/filter';
import type { IMethod } from './interfaces/authorization/entities/method';
import type { IMethodFilter } from './interfaces/authorization/entities/method-filter';
import type { IModel } from './interfaces/authorization/entities/model';
import type { IRole } from './interfaces/authorization/entities/role';
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
import type { INotice } from './interfaces/notifications/entities/notice';
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
import type {
  IChangeLoginInput,
  IChangeLoginOutput,
} from './interfaces/users/methods/user/change-login';
import type {
  IChangePasswordInput,
  IChangePasswordOutput,
} from './interfaces/users/methods/user/change-password';
import type {
  ICheckUsernameInput,
  ICheckUsernameOutput,
} from './interfaces/users/methods/user/check-username';
import type { ISignInInput, ISignInOutput } from './interfaces/users/methods/user/sign-in';
import type { ISignOutInput, ISignOutOutput } from './interfaces/users/methods/user/sign-out';
import type { ISignUpInput, ISignUpOutput } from './interfaces/users/methods/user/sign-up';

export interface IEndpointsCreateHandlerConfig
  extends Pick<IApiClientReqOptions, 'isCached' | 'isSkipRenew'> {}

export interface IEndpointsCreateHandlerOptions
  extends Omit<IApiClientReqOptions, 'isCached' | 'isSkipRenew'> {}

export type TBatchReturn<T> = { -readonly [P in keyof T]: Awaited<T[P]> };

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
   * Convert backend error messages to client message
   */
  public getFormattedErrorMessage(message?: string): string | undefined {
    if (!message) {
      return;
    }

    const res = /"(?<entity>\w+)\((?<type>\w+)\):(?<field>\w+)"/.exec(message);

    if (!res?.groups?.type) {
      return message;
    }

    const {
      groups: { type, field },
    } = res;

    switch (type) {
      case ErrorType.unique:
        return `Value for field ${field} already taken`;
      case ErrorType.pk:
        return 'This entry already exists';
    }

    return message;
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
              Object.values(constraints)[0]
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
      message:
        fields === undefined ? this.getFormattedErrorMessage(groupErrors[0]?.message) : undefined,
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
      create: this.createHandler<ITokenCreateInput, ITokenCreateOutput>(
        'authentication.token.create',
      ),
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
    endpointFilter: {
      list: this.createHandler<IQuery<IMethodFilter>, IList<IMethodFilter>>(
        'authorization.endpoint-filter.list',
      ),
      create: this.createHandler<ICreate<IMethodFilter>, IView<IMethodFilter>>(
        'authorization.endpoint-filter.create',
      ),
      update: this.createHandler<IUpdate<IMethodFilter>, IView<IMethodFilter>>(
        'authorization.endpoint-filter.update',
      ),
      remove: this.createHandler<IQuery<IMethodFilter>, IRemove<IMethodFilter>>(
        'authorization.endpoint-filter.remove',
      ),
      view: this.createHandler<IQuery<IMethodFilter>, IView<IMethodFilter>>(
        'authorization.endpoint-filter.view',
      ),
    },
    condition: {
      list: this.createHandler<IQuery<ICondition>, IList<ICondition>>(
        'authorization.condition.list',
      ),
      create: this.createHandler<ICreate<ICondition>, IView<ICondition>>(
        'authorization.condition.create',
      ),
      update: this.createHandler<IUpdate<ICondition>, IView<ICondition>>(
        'authorization.condition.update',
      ),
      remove: this.createHandler<IQuery<ICondition>, IRemove<ICondition>>(
        'authorization.condition.remove',
      ),
      view: this.createHandler<IQuery<ICondition>, IView<ICondition>>(
        'authorization.condition.view',
      ),
    },
    endpoint: {
      list: this.createHandler<IQuery<IMethod>, IList<IMethod>>('authorization.endpoint.list'),
      create: this.createHandler<ICreate<IMethod>, IView<IMethod>>('authorization.endpoint.create'),
      update: this.createHandler<IUpdate<IMethod>, IView<IMethod>>('authorization.endpoint.update'),
      remove: this.createHandler<IQuery<IMethod>, IRemove<IMethod>>(
        'authorization.endpoint.remove',
      ),
      view: this.createHandler<IQuery<IMethod>, IView<IMethod>>('authorization.endpoint.view'),
    },
    filter: {
      list: this.createHandler<IQuery<IFilter>, IList<IFilter>>('authorization.filter.list'),
      create: this.createHandler<ICreate<IFilter>, IView<IFilter>>('authorization.filter.create'),
      update: this.createHandler<IUpdate<IFilter>, IView<IFilter>>('authorization.filter.update'),
      remove: this.createHandler<IQuery<IFilter>, IRemove<IFilter>>('authorization.filter.remove'),
      view: this.createHandler<IQuery<IFilter>, IView<IFilter>>('authorization.filter.view'),
    },
    model: {
      list: this.createHandler<IQuery<IModel>, IList<IModel>>('authorization.model.list'),
      create: this.createHandler<ICreate<IModel>, IView<IModel>>('authorization.model.create'),
      update: this.createHandler<IUpdate<IModel>, IView<IModel>>('authorization.model.update'),
      remove: this.createHandler<IQuery<IModel>, IRemove<IModel>>('authorization.model.remove'),
      view: this.createHandler<IQuery<IModel>, IView<IModel>>('authorization.model.view'),
    },
    role: {
      list: this.createHandler<IQuery<IRole>, IList<IRole>>('authorization.role.list'),
      create: this.createHandler<ICreate<IRole>, IView<IRole>>('authorization.role.create'),
      update: this.createHandler<IUpdate<IRole>, IView<IRole>>('authorization.role.update'),
      remove: this.createHandler<IQuery<IRole>, IRemove<IRole>>('authorization.role.remove'),
      view: this.createHandler<IQuery<IRole>, IView<IRole>>('authorization.role.view'),
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
      count: this.createHandler<IQuery<IUser>, ICount>('users.user.count'),
      update: this.createHandler<IUpdate<IUser>, IView<IUser>>('users.user.update'),
      changePassword: this.createHandler<IChangePasswordInput, IChangePasswordOutput>(
        'users.user.change-password',
      ),
      changeLogin: this.createHandler<IChangeLoginInput, IChangeLoginOutput>(
        'users.user.change-login',
      ),
      checkUsername: this.createHandler<ICheckUsernameInput, ICheckUsernameOutput>(
        'users.user.check-username',
      ),
      create: this.createHandler<ICreate<IUser>, IView<IUser>>('users.user.create'),
      signUp: this.createHandler<ISignUpInput, ISignUpOutput>('users.user.sign-up'),
      signIn: this.createHandler<ISignInInput, ISignInOutput>('users.user.sign-in'),
      signOut: this.createHandler<ISignOutInput, ISignOutOutput>('users.user.sign-out', {
        isSkipRenew: true,
      }),
      remove: this.createHandler<IQuery<IUser>, IRemove<IUser>>('users.user.remove'),
    },
    confirmCode: {
      send: this.createHandler<IConfirmCodeSendInput, IConfirmCodeSendOutput>(
        'users.confirm-code.send',
      ),
    },
    profile: {
      update: this.createHandler<IUpdate<IProfile>, IView<IProfile>>('users.profile.update'),
      view: this.createHandler<IQuery<IProfile>, IView<IProfile>>('users.profile.view'),
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
    notice: {
      list: this.createHandler<IQuery<INotice>, IList<INotice>>('notification.notice.list'),
      view: this.createHandler<IQuery<INotice>, IView<INotice>>('notification.notice.view'),
      create: this.createHandler<ICreate<INotice>, IView<INotice>>('notification.notice.create'),
      remove: this.createHandler<IQuery<INotice>, IRemove<INotice>>('notification.notice.remove'),
    },
  };
}

export default Endpoints;

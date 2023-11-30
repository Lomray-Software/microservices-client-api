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
  IRestore,
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
import type {
  ISyncMetadataInput,
  ISyncMetadataOutput,
} from './interfaces/authorization/methods/service/sync-metadata';
import type IUserRoleMyOutput from './interfaces/authorization/methods/user-role/my';
import type {
  IUserRoleViewInput,
  IUserRoleViewOutput,
} from './interfaces/authorization/methods/user-role/view';
import type IArticle from './interfaces/blog/entities/article';
import type ICategory from './interfaces/blog/entities/category';
import type IComponent from './interfaces/content/entities/component';
import type ISingleType from './interfaces/content/entities/single-type';
import type { IFile } from './interfaces/files/entities/file';
import type IFileEntity from './interfaces/files/entities/file-entity';
import type IFolder from './interfaces/files/entities/folder';
import type { IFileCreateInput } from './interfaces/files/methods/file/create';
import type { IFileRemoveInput, IFileRemoveOutput } from './interfaces/files/methods/file/remove';
import type INotice from './interfaces/notifications/entities/notice';
import type ITask from './interfaces/notifications/entities/task';
import type {
  ITaskProcessInput,
  ITaskProcessOutput,
} from './interfaces/notifications/jobs/task/process';
import type {
  IEmailSendInput,
  IEmailSendOutput,
} from './interfaces/notifications/methods/email/send';
import type { IHideAllOutput } from './interfaces/notifications/methods/notice/hide-all';
import type {
  IPhoneSendInput,
  IPhoneSendOutput,
} from './interfaces/notifications/methods/phone/send';
import type IBankAccount from './interfaces/payment-stripe/entities/bank-account';
import type ICard from './interfaces/payment-stripe/entities/card';
import type ICart from './interfaces/payment-stripe/entities/cart';
import type ICartProductPrice from './interfaces/payment-stripe/entities/cart-product-price';
import type ICoupon from './interfaces/payment-stripe/entities/coupon';
import type ICustomer from './interfaces/payment-stripe/entities/customer';
import type IPrice from './interfaces/payment-stripe/entities/price';
import type IProduct from './interfaces/payment-stripe/entities/product';
import type IPromoCode from './interfaces/payment-stripe/entities/promo-code';
import type IRefund from './interfaces/payment-stripe/entities/refund';
import type ITransaction from './interfaces/payment-stripe/entities/transaction';
import type {
  IBankAccountAddInput,
  IBankAccountAddOutput,
} from './interfaces/payment-stripe/methods/bank-account/add';
import type { ICardAddInput, ICardAddOutput } from './interfaces/payment-stripe/methods/card/add';
import type {
  ICreateCouponInput,
  ICreateCouponOutput,
} from './interfaces/payment-stripe/methods/coupon/create';
import type {
  ICustomerCreateInput,
  ICustomerCreateOutput,
} from './interfaces/payment-stripe/methods/customer/create';
import type {
  IPriceCreateInput,
  IPriceCreateOutput,
} from './interfaces/payment-stripe/methods/price/create';
import type {
  IProductCreateInput,
  IProductCreateOutput,
} from './interfaces/payment-stripe/methods/product/create';
import type {
  IConnectAccountLinkInput,
  IConnectAccountLinkOutput,
} from './interfaces/payment-stripe/methods/stripe/account-link';
import type {
  IBalanceInput,
  IBalanceOutput,
} from './interfaces/payment-stripe/methods/stripe/balance';
import type {
  IConnectAccountInput,
  IConnectAccountOutput,
} from './interfaces/payment-stripe/methods/stripe/connect-account';
import type {
  ICreateCartCheckoutInput,
  ICreateCartCheckoutOutput,
} from './interfaces/payment-stripe/methods/stripe/create-cart-checkout';
import type {
  ICreateCheckoutInput,
  ICreateCheckoutOutput,
} from './interfaces/payment-stripe/methods/stripe/create-checkout';
import type {
  ICreatePaymentIntentInput,
  ICreatePaymentIntentOutput,
} from './interfaces/payment-stripe/methods/stripe/create-payment-intent';
import type {
  IDashboardLoginLinkInput,
  IDashboardLoginLinkOutput,
} from './interfaces/payment-stripe/methods/stripe/dashboard-login-link';
import type {
  IInstantPayoutInput,
  IInstantPayoutOutput,
} from './interfaces/payment-stripe/methods/stripe/instant-payout';
import type {
  IPaymentIntentFeesInput,
  IPaymentIntentFeesOutput,
} from './interfaces/payment-stripe/methods/stripe/payment-intent-fees';
import type {
  IPayoutInput,
  IPayoutOutput,
} from './interfaces/payment-stripe/methods/stripe/payout';
import type {
  IRefundInput,
  IRefundOutput,
} from './interfaces/payment-stripe/methods/stripe/refund';
import type {
  ISetupIntentInput,
  ISetupIntentOutput,
} from './interfaces/payment-stripe/methods/stripe/setup-intent';
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
    options?: IApiClientReqOptions,
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

    const result = await this.apiClient.sendRequest(requests as never, options);

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
    service: {
      syncMetadata: this.createHandler<ISyncMetadataInput, ISyncMetadataOutput>(
        'authorization.service.sync-metadata',
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
      restore: this.createHandler<IQuery<IUser>, IRestore<IUser>>('users.user.restore'),
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
    folder: {
      create: this.createHandler<ICreate<IFolder>, IView<IFolder>>('files.folder.create'),
      update: this.createHandler<IUpdate<IFolder>, IUpdate<IFolder>>('files.folder.update'),
      remove: this.createHandler<IQuery<IFolder>, IRemove<IFolder>>('files.folder.remove'),
      view: this.createHandler<IQuery<IFolder>, IView<IFolder>>('files.folder.view'),
      list: this.createHandler<IQuery<IFolder>, IList<IFolder>>('files.folder.list'),
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
      update: this.createHandler<IUpdate<INotice>, IView<INotice>>('notification.notice.update'),
      count: this.createHandler<IQuery<INotice>, ICount>('notification.notice.count'),
      hideAll: this.createHandler<never, IHideAllOutput>('notification.notice.hide-all'),
    },
    task: {
      list: this.createHandler<IQuery<ITask>, IList<ITask>>('notification.task.list'),
      view: this.createHandler<IQuery<ITask>, IView<ITask>>('notification.task.view'),
      create: this.createHandler<ICreate<ITask>, IView<ITask>>('notification.task.create'),
      remove: this.createHandler<IQuery<ITask>, IRemove<ITask>>('notification.task.remove'),
      update: this.createHandler<IUpdate<ITask>, IView<ITask>>('notification.task.update'),
      count: this.createHandler<IQuery<ITask>, ICount>('notification.task.count'),
    },
    job: {
      task: {
        process: this.createHandler<ITaskProcessInput, ITaskProcessOutput>(
          'notification.job.task.process',
        ),
      },
    },
  };

  /**
   * Content microservice
   */
  content = {
    component: {
      list: this.createHandler<IQuery<IComponent>, IList<IComponent>>('content.component.list'),
      view: this.createHandler<IQuery<IComponent>, IView<IComponent>>('content.component.view'),
      create: this.createHandler<ICreate<IComponent>, IView<IComponent>>(
        'content.component.create',
      ),
      update: this.createHandler<IUpdate<IComponent>, IView<IComponent>>(
        'content.component.update',
      ),
      remove: this.createHandler<IQuery<IComponent>, IRemove<IComponent>>(
        'content.component.remove',
      ),
      count: this.createHandler<IQuery<IComponent>, ICount>('content.component.count'),
    },
    singleType: {
      list: this.createHandler<IQuery<ISingleType>, IList<ISingleType>>('content.single-type.list'),
      view: this.createHandler<IQuery<ISingleType>, IView<ISingleType>>('content.single-type.view'),
      create: this.createHandler<ICreate<ISingleType>, IView<ISingleType>>(
        'content.single-type.create',
      ),
      update: this.createHandler<IUpdate<ISingleType>, IView<ISingleType>>(
        'content.single-type.update',
      ),
      remove: this.createHandler<IQuery<ISingleType>, IRemove<ISingleType>>(
        'content.single-type.remove',
      ),
      count: this.createHandler<IQuery<ISingleType>, ICount>('content.single-type.count'),
    },
  };

  /**
   * Payment stripe microservice
   */
  paymentStripe = {
    customer: {
      list: this.createHandler<IQuery<ICustomer>, IList<ICustomer>>('payment-stripe.customer.list'),
      view: this.createHandler<IQuery<ICustomer>, IView<ICustomer>>('payment-stripe.customer.view'),
      update: this.createHandler<IUpdate<ICustomer>, IView<ICustomer>>(
        'payment-stripe.customer.update',
      ),
      remove: this.createHandler<IQuery<ICustomer>, IRemove<ICustomer>>(
        'payment-stripe.customer.remove',
      ),
      count: this.createHandler<IQuery<ICustomer>, ICount>('payment-stripe.customer.count'),
      create: this.createHandler<ICustomerCreateInput, ICustomerCreateOutput>(
        'payment-stripe.customer.create',
      ),
    },
    card: {
      list: this.createHandler<IQuery<ICard>, IList<ICard>>('payment-stripe.card.list'),
      view: this.createHandler<IQuery<ICard>, IView<ICard>>('payment-stripe.card.view'),
      update: this.createHandler<IUpdate<ICard>, IView<ICard>>('payment-stripe.card.update'),
      remove: this.createHandler<IQuery<ICard>, IRemove<ICard>>('payment-stripe.card.remove'),
      count: this.createHandler<IQuery<ICard>, ICount>('payment-stripe.card.count'),
      add: this.createHandler<ICardAddInput, ICardAddOutput>('payment-stripe.card.add'),
    },
    bankAccount: {
      list: this.createHandler<IQuery<IBankAccount>, IList<IBankAccount>>(
        'payment-stripe.bank-account.list',
      ),
      view: this.createHandler<IQuery<IBankAccount>, IView<IBankAccount>>(
        'payment-stripe.bank-account.view',
      ),
      update: this.createHandler<IUpdate<IBankAccount>, IView<IBankAccount>>(
        'payment-stripe.bank-account.update',
      ),
      remove: this.createHandler<IQuery<IBankAccount>, IRemove<IBankAccount>>(
        'payment-stripe.bank-account.remove',
      ),
      count: this.createHandler<IQuery<IBankAccount>, ICount>('payment-stripe.bank-account.count'),
      add: this.createHandler<IBankAccountAddInput, IBankAccountAddOutput>(
        'payment-stripe.bank-account.add',
      ),
    },
    transaction: {
      list: this.createHandler<IQuery<ITransaction>, IList<ITransaction>>(
        'payment-stripe.transaction.list',
      ),
      view: this.createHandler<IQuery<ITransaction>, IView<ITransaction>>(
        'payment-stripe.transaction.view',
      ),
      count: this.createHandler<IQuery<ITransaction>, ICount>('payment-stripe.transaction.count'),
    },
    refund: {
      list: this.createHandler<IQuery<IRefund>, IList<IRefund>>('payment-stripe.refund.list'),
      view: this.createHandler<IQuery<IRefund>, IView<IRefund>>('payment-stripe.refund.view'),
      count: this.createHandler<IQuery<IRefund>, ICount>('payment-stripe.refund.count'),
    },
    product: {
      list: this.createHandler<IQuery<IProduct>, IList<IProduct>>('payment-stripe.product.list'),
      view: this.createHandler<IQuery<IProduct>, IView<IProduct>>('payment-stripe.product.view'),
      update: this.createHandler<IUpdate<IProduct>, IView<IProduct>>(
        'payment-stripe.product.update',
      ),
      remove: this.createHandler<IQuery<IProduct>, IRemove<IProduct>>(
        'payment-stripe.product.remove',
      ),
      count: this.createHandler<IQuery<IProduct>, ICount>('payment-stripe.product.count'),
      create: this.createHandler<IProductCreateInput, IProductCreateOutput>(
        'payment-stripe.product.create',
      ),
    },
    price: {
      list: this.createHandler<IQuery<IPrice>, IList<IPrice>>('payment-stripe.price.list'),
      view: this.createHandler<IQuery<IPrice>, IView<IPrice>>('payment-stripe.price.view'),
      update: this.createHandler<IUpdate<IPrice>, IView<IPrice>>('payment-stripe.price.update'),
      remove: this.createHandler<IQuery<IPrice>, IRemove<IPrice>>('payment-stripe.price.remove'),
      count: this.createHandler<IQuery<IPrice>, ICount>('payment-stripe.price.count'),
      create: this.createHandler<IPriceCreateInput, IPriceCreateOutput>(
        'payment-stripe.price.create',
      ),
    },
    stripe: {
      accountLink: this.createHandler<IConnectAccountLinkInput, IConnectAccountLinkOutput>(
        'payment-stripe.stripe.account-link',
      ),
      balance: this.createHandler<IBalanceInput, IBalanceOutput>('payment-stripe.stripe.balance'),
      connectAccount: this.createHandler<IConnectAccountInput, IConnectAccountOutput>(
        'payment-stripe.stripe.connect-account',
      ),
      createCheckout: this.createHandler<ICreateCheckoutInput, ICreateCheckoutOutput>(
        'payment-stripe.stripe.create-checkout',
      ),
      createPaymentIntent: this.createHandler<
        ICreatePaymentIntentInput,
        ICreatePaymentIntentOutput
      >('payment-stripe.stripe.create-payment-intent'),
      instantPayout: this.createHandler<IInstantPayoutInput, IInstantPayoutOutput>(
        'payment-stripe.stripe.instant-payout',
      ),
      paymentIntentFees: this.createHandler<IPaymentIntentFeesInput, IPaymentIntentFeesOutput>(
        'payment-stripe.stripe.payment-intent-fees',
      ),
      payout: this.createHandler<IPayoutInput, IPayoutOutput>('payment-stripe.stripe.payout'),
      refund: this.createHandler<IRefundInput, IRefundOutput>('payment-stripe.stripe.refund'),
      setupIntent: this.createHandler<ISetupIntentInput, ISetupIntentOutput>(
        'payment-stripe.stripe.setup-intent',
      ),
      createCartCheckout: this.createHandler<ICreateCartCheckoutInput, ICreateCartCheckoutOutput>(
        'payment-stripe.stripe.create-cart-checkout',
      ),
      dashboardLoginLink: this.createHandler<IDashboardLoginLinkInput, IDashboardLoginLinkOutput>(
        'payment-stripe.stripe.dashboard-login-link',
      ),
    },
    promoCode: {
      create: this.createHandler<ICreate<IPromoCode>, IView<IPromoCode>>(
        'payment-stripe.promo-code.create',
      ),
      list: this.createHandler<IQuery<IPromoCode>, IList<IPromoCode>>(
        'payment-stripe.promo-code.list',
      ),
      view: this.createHandler<IQuery<IPromoCode>, IView<IPromoCode>>(
        'payment-stripe.promo-code.view',
      ),
      update: this.createHandler<IUpdate<IPromoCode>, IView<IPromoCode>>(
        'payment-stripe.promo-code.update',
      ),
      remove: this.createHandler<IQuery<IPromoCode>, IRemove<IPromoCode>>(
        'payment-stripe.promo-code.remove',
      ),
      count: this.createHandler<IQuery<IPromoCode>, ICount>('payment-stripe.promo-code.count'),
    },
    coupon: {
      create: this.createHandler<ICreateCouponInput, ICreateCouponOutput>(
        'payment-stripe.coupon.create',
      ),
      list: this.createHandler<IQuery<ICoupon>, IList<ICoupon>>('payment-stripe.coupon.list'),
      view: this.createHandler<IQuery<ICoupon>, IView<ICoupon>>('payment-stripe.coupon.view'),
      update: this.createHandler<IUpdate<ICoupon>, IView<ICoupon>>('payment-stripe.coupon.update'),
      remove: this.createHandler<IQuery<ICoupon>, IRemove<ICoupon>>('payment-stripe.coupon.remove'),
      count: this.createHandler<IQuery<ICoupon>, ICount>('payment-stripe.coupon.count'),
    },
    cart: {
      create: this.createHandler<ICreate<ICart>, IView<ICart>>('payment-stripe.cart.create'),
      list: this.createHandler<IQuery<ICart>, IList<ICart>>('payment-stripe.cart.list'),
      view: this.createHandler<IQuery<ICart>, IView<ICart>>('payment-stripe.cart.view'),
      update: this.createHandler<IUpdate<ICart>, IView<ICart>>('payment-stripe.cart.update'),
      remove: this.createHandler<IQuery<ICart>, IRemove<ICart>>('payment-stripe.cart.remove'),
      count: this.createHandler<IQuery<ICart>, ICount>('payment-stripe.cart.count'),
    },
    cartProductPrice: {
      create: this.createHandler<ICreate<ICartProductPrice>, IView<ICartProductPrice>>(
        'payment-stripe.cart-product-price.create',
      ),
      list: this.createHandler<IQuery<ICartProductPrice>, IList<ICartProductPrice>>(
        'payment-stripe.cart-product-price.list',
      ),
      view: this.createHandler<IQuery<ICartProductPrice>, IView<ICartProductPrice>>(
        'payment-stripe.cart-product-price.view',
      ),
      update: this.createHandler<IUpdate<ICartProductPrice>, IView<ICartProductPrice>>(
        'payment-stripe.cart-product-price.update',
      ),
      remove: this.createHandler<IQuery<ICartProductPrice>, IRemove<ICartProductPrice>>(
        'payment-stripe.cart-product-price.remove',
      ),
      count: this.createHandler<IQuery<ICartProductPrice>, ICount>(
        'payment-stripe.cart-product-price.count',
      ),
    },
  };

  /**
   * Blog microservice
   */
  blog = {
    article: {
      list: this.createHandler<IQuery<IArticle>, IList<IArticle>>('blog.article.list'),
      view: this.createHandler<IQuery<IArticle>, IView<IArticle>>('blog.article.view'),
      create: this.createHandler<ICreate<IArticle>, IView<IArticle>>('blog.article.create'),
      update: this.createHandler<IUpdate<IArticle>, IView<IArticle>>('blog.article.update'),
      remove: this.createHandler<IQuery<IArticle>, IRemove<IArticle>>('blog.article.remove'),
      count: this.createHandler<IQuery<IArticle>, ICount>('blog.article.count'),
    },
    category: {
      list: this.createHandler<IQuery<ICategory>, IList<ICategory>>('blog.category.list'),
      view: this.createHandler<IQuery<ICategory>, IView<ICategory>>('blog.category.view'),
      create: this.createHandler<ICreate<ICategory>, IView<ICategory>>('blog.category.create'),
      update: this.createHandler<IUpdate<ICategory>, IView<ICategory>>('blog.category.update'),
      remove: this.createHandler<IQuery<ICategory>, IRemove<ICategory>>('blog.category.remove'),
      count: this.createHandler<IQuery<ICategory>, ICount>('blog.category.count'),
    },
  };
}

export default Endpoints;

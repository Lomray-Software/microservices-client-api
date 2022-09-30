import type IdProvider from '../../../../constants/id-provider';
import type IUser from '../../entities/user';

interface IIdentityProviderSignInInput<TIdProvider = IdProvider> {
  provider: TIdProvider;
  token: string;
  params?: Record<string, any>;
}

interface IIdentityProviderSignInOutput {
  user: IUser;
  tokens: {
    access: string;
    refresh: string;
  };
}

export type { IIdentityProviderSignInInput, IIdentityProviderSignInOutput };

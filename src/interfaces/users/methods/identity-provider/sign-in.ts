import type { IdProvider } from '../../entities/identity-provider';
import type IUser from '../../entities/user';

interface IIdentityProviderSignInInput {
  provider: IdProvider;
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

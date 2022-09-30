import type IUser from '../../entities/user';

interface ISignInInput {
  login: string;
  password: string;
}

interface ISignInOutput {
  user: IUser;
  tokens: {
    access?: string;
    refresh: string;
  };
}

export { ISignInInput, ISignInOutput };

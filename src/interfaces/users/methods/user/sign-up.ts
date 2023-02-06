import type { ICreate } from '@lomray/microservices-types';
import type ConfirmBy from '../../../../constants/confirm-by';
import type IUser from '../../entities/user';

interface ISignUpInput extends ICreate<IUser> {
  confirmBy: ConfirmBy;
  confirmCode: string | number;
}

interface ISignUpOutput {
  user: IUser;
  tokens: {
    access?: string;
    refresh: string;
  };
}

export { ISignUpInput, ISignUpOutput };

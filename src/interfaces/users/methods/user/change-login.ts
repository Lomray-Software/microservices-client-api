import type ConfirmBy from '../../../../constants/confirm-by';

interface IChangeLoginInput {
  userId: string;
  login: string;
  confirmBy: ConfirmBy;
  confirmCode: string | number;
}

interface IChangeLoginOutput {
  isChanged: boolean;
}

export { IChangeLoginInput, IChangeLoginOutput };

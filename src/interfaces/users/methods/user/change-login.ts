import type ConfirmBy from '../../../../constants/confirm-by';

class IChangeLoginInput {
  userId: string;
  login: string;
  confirmBy: ConfirmBy;
  confirmCode: string | number;
}

class IChangeLoginOutput {
  isChanged: boolean;
}

export type { IChangeLoginInput, IChangeLoginOutput };

import type ConfirmBy from '../../../../constants/confirm-by';

interface IChangePasswordInput {
  userId: string;
  newPassword: string;
  oldPassword?: string;
  confirmBy?: ConfirmBy;
  confirmCode?: string;
  allowByAdmin: boolean;
}

interface IChangePasswordOutput {
  isChanged: boolean;
}

export type { IChangePasswordInput, IChangePasswordOutput };

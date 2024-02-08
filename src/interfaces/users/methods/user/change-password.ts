import type ConfirmBy from '../../../../constants/confirm-by';

type TClearUserTokens = 'all' | 'rest' | 'none';

interface IChangePasswordInput {
  userId?: string;
  login?: string;
  newPassword: string;
  oldPassword?: string;
  confirmBy?: ConfirmBy;
  confirmCode?: string;
  allowByAdmin?: boolean;
  clearTokensType?: TClearUserTokens;
}

interface IChangePasswordOutput {
  isChanged: boolean;
}

export type { IChangePasswordInput, IChangePasswordOutput, TClearUserTokens };

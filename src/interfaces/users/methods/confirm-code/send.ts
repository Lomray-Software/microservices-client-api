import type ConfirmBy from '../../../../constants/confirm-by';

interface IConfirmCodeSendInput {
  type: ConfirmBy;
  login: string;
}

interface IConfirmCodeSendOutput {
  isSent: boolean;
}

export { IConfirmCodeSendInput, IConfirmCodeSendOutput };

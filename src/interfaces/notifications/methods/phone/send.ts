export interface IPhoneSendInput {
  to: string[];
  message: string;
}

export interface IPhoneSendOutput {
  isSent: boolean;
}

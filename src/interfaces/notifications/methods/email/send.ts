export interface IEmailSendInput {
  from?: string; // it can be default value
  to: string[];
  subject: string;
  text: string;
  html: string;
}

export interface IEmailSendOutput {
  isSent: boolean;
}

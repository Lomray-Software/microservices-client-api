export interface IAttachment {
  filename?: string | false | undefined;
  // Base64, hex or a binary
  encoding?: string | undefined;
  // String, Buffer or a Stream contents for the attachmentent
  content?: string;
}

export interface IEmailSendInput {
  to: string[];
  subject: string;
  text: string;
  html: string;
  // It can be default value
  from?: string;
  attachments?: IAttachment[];
}

export interface IEmailSendOutput {
  isSent: boolean;
}

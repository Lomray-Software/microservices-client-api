export interface IMessage {
  id: string;
  type: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  params: Record<string, any>;
  createdAt: Date;
}

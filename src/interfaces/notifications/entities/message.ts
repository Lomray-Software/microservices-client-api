import type { IEntity } from '@lomray/microservices-types';
import type NotifyType from '../../../constants/notification/notify-type';
import type { IAttachment } from '../methods/email/send';
import type INotice from './notice';
import type IRecipient from './recipient';
import type ITask from './task';

export interface IParams {
  isTemplate?: boolean;
  [key: string]: any;
}

interface IMessage extends IEntity {
  id?: string;
  noticeId?: string | null;
  // Define task relation and message as template for task
  taskId?: string | null;
  // Can be nullable if message presented as template.
  from?: string | null;
  // It can be email, phone, userId. Can be nullable if message presented as template.
  to?: string | null;
  type?: NotifyType;
  subject?: string;
  text?: string;
  html?: string | null;
  attachments?: IAttachment[];
  params?: IParams;
  createdAt?: Date;
  notice?: INotice;
  task?: ITask;
  recipient?: IRecipient;
}

export default IMessage;

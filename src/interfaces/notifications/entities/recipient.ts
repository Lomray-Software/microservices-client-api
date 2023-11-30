import type { IEntity } from '@lomray/microservices-types';
import type IMessage from './message';
import type ITask from './task';

interface IRecipient extends IEntity {
  userId: string;
  taskId?: string;
  messageId?: string | null;
  createdAt?: Date;
  task?: ITask;
  message?: IMessage;
}

export default IRecipient;

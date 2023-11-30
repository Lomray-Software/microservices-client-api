import type { IEntity } from '@lomray/microservices-types';
import type IMessage from './message';
import type ITask from './task';

export interface IParams {
  isTemplate?: boolean;
  [key: string]: any;
}

interface INotice extends IEntity {
  id: string;
  type?: string;
  userId?: string;
  // Define task relation and notice as template for task
  taskId?: string | null;
  title?: string;
  description?: string;
  isViewed?: boolean;
  isHidden?: boolean;
  params?: IParams;
  createdAt?: Date;
  task?: ITask;
  messages?: IMessage[];
}

export default INotice;

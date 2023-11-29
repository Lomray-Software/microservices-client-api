import type ITask from './task';

export interface IMessage {
  id: string;
  // Define task relation and message as template for task
  taskId?: string | null;
  type?: string;
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
  params?: Record<string, any>;
  createdAt?: Date;
  task?: ITask;
}

import type ITask from './task';

export interface INotice {
  id: string;
  type?: string;
  userId?: string;
  // Define task relation and notice as template for task
  taskId?: string | null;
  title?: string;
  description?: string;
  isViewed?: boolean;
  isHidden?: boolean;
  params?: Record<string, any>;
  createdAt?: Date;
  task?: ITask;
}

import type { IEntity } from '@lomray/microservices-types';
import type TaskStatus from '../../../constants/notification/task-status';
import type TaskType from '../../../constants/notification/task-type';
import type { IMessage } from './message';
import type { INotice } from './notice';

interface ITask extends IEntity {
  id: string;
  type?: TaskType;
  /**
   * Last target on which task process failed. Retry failed task process from this entity id. Can be presented as any id:
   * entity id, page number and so on
   */
  lastFailTargetId?: string | null; // '0771fea0-cf98-4208-8dd6-a9288e9bdd73', '1'
  // Current task status
  status?: TaskStatus;
  params?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
  // Notice template and created from this task notices
  notices?: INotice[];
  // Message template and created from this task messages
  messages?: IMessage[];
}

export default ITask;

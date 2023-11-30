import type { IEntity } from '@lomray/microservices-types';
import type TaskMode from '../../../constants/notification/task-mode';
import type TaskStatus from '../../../constants/notification/task-status';
import type TaskType from '../../../constants/notification/task-type';
import type IMessage from './message';
import type INotice from './notice';
import type IRecipient from './recipient';

export interface IParams {
  lastErrorMessage?: string;
  [key: string]: any;
}

interface ITask extends IEntity {
  id: string;
  type?: TaskType;
  /**
   * Last target on which task process failed. Retry failed task process from this entity id. Can be presented as any id:
   * entity id, page number and so on
   */
  lastFailTargetId?: string | null;
  // Current task status
  status?: TaskStatus;
  /**
   * Default - checks based on last target error. Full check up - checks all entities for each chunk.
   * Case example: If whole backend will down and some tasks were not completed. You MUST run task in full check up mode for preventing
   * duplicate notices, messages ans so on.
   * Full check up mode - will take longer time for process all task requirements.
   */
  mode?: TaskMode;
  params?: IParams;
  createdAt?: Date;
  updatedAt?: Date;
  // Notice template and created from this task notices
  notices?: INotice[];
  // Message template and created from this task messages
  messages?: IMessage[];
  // Recipient group that should receive task template entity (email message and so on)
  recipients?: IRecipient[];
}

export default ITask;

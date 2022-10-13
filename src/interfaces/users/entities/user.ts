import type { IEntity } from '@lomray/microservices-types';
import type Role from '../../../constants/role';
import type { IAttachment } from '../../attachments/entities/attachment';
import type IProfile from './profile';

/**
 * User entity
 */
interface IUser<TRole = Role> extends IEntity {
  id: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string | null;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  profile?: IProfile;
  avatar?: IAttachment;
  role?: TRole;
}

export default IUser;

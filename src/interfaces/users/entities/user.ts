import type { IEntity } from '@lomray/microservices-types';
import type { IAttachment } from '../../attachments/entities/attachment';
import type { Role } from '../../authorization/entities/role';
import type IProfile from './profile';

/**
 * User entity
 */
interface IUser extends IEntity {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  profile?: IProfile;
  avatar?: IAttachment;
  role?: Role;
}

export default IUser;

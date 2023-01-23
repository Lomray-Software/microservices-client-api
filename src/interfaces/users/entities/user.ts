import type { IEntity } from '@lomray/microservices-types';
import type Role from '../../../constants/role';
import type { IFile } from '../../files/entities/file';
import type IProfile from './profile';

/**
 * User entity
 */
interface IUser<TRole = Role | string> extends IEntity {
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
  avatar?: IFile;
  role?: TRole;
}

export default IUser;

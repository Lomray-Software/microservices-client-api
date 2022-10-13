import type { IEntity } from '@lomray/microservices-types';
import type Role from '../../../constants/role';

/**
 * User role
 */
interface IUserRole<TRole = Role> extends IEntity {
  userId?: string;
  roleAlias?: TRole | string;
  createdAt?: string;
  updatedAt?: string;
}

export default IUserRole;

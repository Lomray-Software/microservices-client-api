import type { IEntity } from '@lomray/microservices-types';
import type { Role } from './role';

/**
 * User role
 */
interface IUserRole extends IEntity {
  userId: string;
  roleAlias: Role;
  createdAt: string;
  updatedAt: string;
}

export default IUserRole;

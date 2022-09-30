import type { IEntity } from '@lomray/microservices-types';
import type Role from '../../../constants/role';

/**
 * Role
 */
export interface IRole<TRole = Role> extends IEntity {
  alias: TRole;
  parentAlias: TRole | null;
  name: string;
  createdAt: string;
  updatedAt: string;
}

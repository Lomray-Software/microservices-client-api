import type { IEntity } from '@lomray/microservices-types';

export enum Role {
  guest = 'guest',
  user = 'user',
  admin = 'admin',
}

/**
 * Role
 */
export interface IRole extends IEntity {
  alias: Role;
  parentAlias: Role | null;
  name: string;
  createdAt: string;
  updatedAt: string;
}

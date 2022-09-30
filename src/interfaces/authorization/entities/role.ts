import type { IEntity } from '@lomray/microservices-types';

enum Role {
  guest = 'guest',
  user = 'user',
  admin = 'admin',
}

/**
 * Role
 */
interface IRole extends IEntity {
  alias: Role;
  parentAlias: Role | null;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export { IRole, Role };

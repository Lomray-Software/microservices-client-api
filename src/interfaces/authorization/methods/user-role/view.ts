import type { Role } from '../../entities/role';

interface IUserRoleViewInput {
  userId: string;
}

interface IUserRoleViewOutput {
  roles: Role[];
}

export { IUserRoleViewInput, IUserRoleViewOutput };

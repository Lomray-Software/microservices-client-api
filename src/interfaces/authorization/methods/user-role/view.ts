import type Role from '../../../../constants/role';

interface IUserRoleViewInput {
  userId: string;
}

interface IUserRoleViewOutput<TRole = Role> {
  roles: TRole[];
}

export { IUserRoleViewInput, IUserRoleViewOutput };

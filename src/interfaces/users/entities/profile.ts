import type { IEntity } from '@lomray/microservices-types';
import type IUser from './user';

export interface IProfileParams {
  isEmailValid?: boolean;
  isPhoneVerified?: boolean;
}

/**
 * User profile
 */
interface IProfile extends IEntity {
  userId: string;
  gender?: string;
  birthDay?: string | null;
  photo?: string | null;
  location?: string | null;
  params?: IProfileParams;
  updatedAt?: string;
  deletedAt?: string;
  user?: IUser;
}

export default IProfile;

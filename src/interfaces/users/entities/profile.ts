import type { IEntity } from '@lomray/microservices-types';

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
  photo?: string;
  birthDay?: string;
  location?: string;
  params?: IProfileParams;
  updatedAt?: string;
}

export default IProfile;

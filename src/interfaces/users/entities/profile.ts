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
  photo?: string | null;
  birthDay?: string | null;
  location?: string | null;
  params?: IProfileParams;
  updatedAt?: string;
}

export default IProfile;

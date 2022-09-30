import type { IEntity } from '@lomray/microservices-types';

/**
 * User profile
 */
interface IProfile extends IEntity {
  userId: string;
  gender: string;
  photo: string;
  birthDay: string;
  params: {
    isEmailValid?: boolean;
    isPhoneVerified?: boolean;
  };
  updatedAt: string;
}

export default IProfile;

import type { IEntity } from '@lomray/microservices-types';
import type TokenType from '../../../constants/token-type';

export interface IUserParams {
  pushNotificationToken?: string;
  [key: string]: any;
}

interface IToken extends IEntity {
  id?: string;
  type?: TokenType;
  userId?: string;
  personal?: string | null;
  access?: string | null;
  refresh?: string | null;
  // Maximum token expiration time
  expirationAt?: number | null;
  // Some token data, like device type and etc.
  params?: Record<string, any>;
  // Some payload data for token.
  jwtPayload?: Record<string, any>;
  // Some user payload data included in tokens.
  userParams?: IUserParams;
  createdAt?: Date;
}

export default IToken;

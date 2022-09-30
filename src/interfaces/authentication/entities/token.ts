import type { IEntity } from '@lomray/microservices-types';

interface IToken extends IEntity {
  id: string;
  userParams: {
    pushNotificationToken?: string;
  };
}

export default IToken;

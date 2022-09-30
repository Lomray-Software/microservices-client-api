import type { IEntity } from '@lomray/microservices-types';

export enum IdProvider {
  FIREBASE = 'firebase',
}

/**
 * Identity providers
 */
export interface IIdentityProvider extends IEntity {
  userId: string;
  provider: IdProvider;
  identifier: string;
  type: string;
  params: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

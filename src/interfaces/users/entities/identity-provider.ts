import type { IEntity } from '@lomray/microservices-types';
import type IdProvider from '../../../constants/id-provider';

/**
 * Identity providers
 */
export interface IIdentityProvider<TIdProvider = IdProvider> extends IEntity {
  userId: string;
  provider: TIdProvider;
  identifier: string;
  type: string;
  params: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

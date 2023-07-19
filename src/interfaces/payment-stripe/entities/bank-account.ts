import type { IEntity } from '@lomray/microservices-types';
import type ICustomer from './customer';

interface IParams {
  bankAccountId?: string;
}

/**
 * Bank account entity
 */
interface IBankAccount extends IEntity {
  id: string;
  userId?: string;
  lastDigits?: string;
  bankName?: string | null;
  holderName?: string | null;
  isDefault?: boolean;
  isInstantPayoutAllowed?: boolean;
  params?: IParams;
  createdAt?: Date;
  updatedAt?: Date;
  customer?: ICustomer;
}

export default IBankAccount;

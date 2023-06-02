import type { IEntity } from '@lomray/microservices-types';
import type StripeAccountTypes from '../../../constants/payment-stripe/stripe-account-types';
import type { TCapabilitiesStatus } from '../interfaces';
import type IBankAccount from './bank-account';
import type ICard from './card';
import type ITransaction from './transaction';

interface IParams {
  // Payment service account id
  accountType?: StripeAccountTypes;
  // Payment service account id
  accountId?: string;
  // Is user setup and verify payment data for accept payments
  isVerified?: boolean;
  // Connect account transfer capability status
  transferCapabilityStatus?: TCapabilitiesStatus;
  // Is allowed for init default payout
  isPayoutEnabled?: boolean;
}

/**
 * Customer entity
 */
interface ICustomer extends IEntity {
  customerId: string;
  userId?: string;
  params?: IParams;
  transactions?: ITransaction[];
  cards?: ICard[];
  bankAccounts?: IBankAccount[];
}

export default ICustomer;

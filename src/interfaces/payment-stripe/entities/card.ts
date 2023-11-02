import type { IEntity } from '@lomray/microservices-types';
import type ICustomer from './customer';

export interface IParams {
  // Only have cards from connected account and cards related to SetupIntent doesn't have own id
  cardId?: string;
  // Related payment method for card. Uses in paymentIntent for proceed payments
  paymentMethodId?: string;
  // Is approved by payment provider (setup is succeeded)
  isApproved?: boolean;
  // Setup intent id
  setupIntentId?: string;
  // Card issuer name
  issuer?: string | null;
  // User payment method billing
  billingCountry?: string | null; // US, BR
  billingPostalCode?: string | null; // 99301 (US WA)
}

/**
 * Card entity
 */
interface ICard extends IEntity {
  id: string;
  userId?: string;
  lastDigits?: string;
  expired?: string;
  holderName?: string | null;
  funding?: string;
  brand?: string;
  // Issuer country. Example: Card issuer (origin) can be Brazil, but user billing US
  origin?: string | null;
  isInstantPayoutAllowed?: boolean;
  params?: IParams;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  customer?: ICustomer;
}

export default ICard;

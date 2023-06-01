import type { IEntity } from '@lomray/microservices-types';
import type ICustomer from './customer';

interface IParams {
  // Only have cards from connected account and cards related to SetupIntent doesn't have own id
  cardId?: string;
  // Related payment method for card. Uses in paymentIntent for proceed payments
  paymentMethodId?: string;
  // Is approved by payment provider (setup is succeeded)
  isApproved?: boolean;
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
  isInstantPayoutAllowed?: boolean;
  params?: IParams;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  customer?: ICustomer;
}

export default ICard;

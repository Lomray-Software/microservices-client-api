import type { IEntity } from '@lomray/microservices-types';
import type StripeCheckoutStatus from '../../../constants/payment-stripe/stripe-checkout-status';
import type StripeTransactionStatus from '../../../constants/payment-stripe/stripe-transaction-status';
import type TransactionRole from '../../../constants/payment-stripe/transaction-role';
import type TransactionStatus from '../../../constants/payment-stripe/transaction-status';
import type TransactionType from '../../../constants/payment-stripe/transaction-type';
import type { ITax } from '../interfaces';
import type ICustomer from './customer';
import type IProduct from './product';

export interface IComputedTax {
  taxId?: ITax['id'];
  taxTransactionAmountWithTaxUnit?: ITax['transactionAmountWithTaxUnit'];
  taxExpiresAt?: ITax['expiresAt'];
  taxCreatedAt?: ITax['createdAt'];
  taxTotalAmountUnit?: ITax['totalAmountUnit'];
  taxBehaviour?: ITax['behaviour'];
  totalTaxPercent?: ITax['totalTaxPercent'];
  taxFeeUnit?: number;
}

export interface IParams extends IComputedTax {
  paymentStatus?: StripeTransactionStatus;
  checkoutStatus?: StripeCheckoutStatus;
  errorMessage?: string;
  // Example: card_declined
  errorCode?: string;
  // Example: generic_decline
  declineCode?: string;
  // Application and stripe fees payer
  feesPayer?: TransactionRole;
  // PaymentIntent charge id, must exist for refund
  chargeId?: string;
  // Decomposed fees
  applicationFee?: number;
  paymentProviderFee?: number;
  extraFee?: number;
  extraRevenue?: number;
  // Amount that will charge for instant payout
  estimatedInstantPayoutFee?: number;
  // Original entity cost
  entityCost?: number;
  // Refunded amount
  refundedAmount?: number;
}

/**
 * Transaction entity
 */
interface ITransaction extends IEntity {
  id: string;
  transactionId?: string;
  title?: string;
  userId?: string;
  type?: TransactionType;
  bankAccountId?: string | null;
  cardId?: string | null;
  paymentMethodId?: string | null;
  entityId?: string;
  // Smallest currency unit amount
  amount?: number;
  // Smallest currency unit tax
  tax?: number;
  // Smallest currency unit fee
  fee?: number;
  status?: TransactionStatus;
  params?: IParams;
  createdAt?: Date;
  updatedAt?: Date;
  product?: IProduct;
  customer?: ICustomer;
}

export default ITransaction;

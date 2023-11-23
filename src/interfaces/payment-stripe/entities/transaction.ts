import type { IEntity } from '@lomray/microservices-types';
import type StripeCheckoutStatus from '../../../constants/payment-stripe/stripe-checkout-status';
import type StripeTransactionStatus from '../../../constants/payment-stripe/stripe-transaction-status';
import type TransactionRole from '../../../constants/payment-stripe/transaction-role';
import type TransactionStatus from '../../../constants/payment-stripe/transaction-status';
import type TransactionType from '../../../constants/payment-stripe/transaction-type';
import type { ITax } from '../interfaces';
import type { IPaymentIntentMetadata } from '../methods/stripe/create-payment-intent';
import type ICustomer from './customer';
import type IProduct from './product';

export interface IComputedTax {
  taxTransactionAmountWithTaxUnit?: ITax['transactionAmountWithTaxUnit'];
  taxExpiresAt?: ITax['expiresAt'];
  taxCreatedAt?: ITax['createdAt'];
  taxTotalAmountUnit?: ITax['totalAmountUnit'];
  taxBehaviour?: ITax['behaviour'];
  totalTaxPercent?: ITax['totalTaxPercent'];
  taxFeeUnit?: number;
  taxAutoCalculationFeeUnit?: number;
}

/**
 * Transaction params
 * @description Definitions:
 * 1. TransferId - Stripe object is created when you move funds between Stripe accounts as part of Connect. Needed for comprehending
 * the transaction state in situations involving the reversal of the full or partial transaction amount and refund with reversal.
 * For instance: py_1OFKUmPBMR5FbqzbQT2N5juH
 * 2. DestinationTransactionId - Stripe destination transaction id. Reference regarding the destination transaction on the connected account's side
 * For instance:  tr_3OFKatAmQ4asS8PS0GlS9dUr
 * 3. PersonalFee - Personal user fee. For receiver, it's application fees with only debit extra fees.
 *  For sender, it's application fees with only credit extra fees.
 */
export interface IParams
  extends Omit<IComputedTax, 'taxAutoCalculationFeeUnit'>,
    Pick<IPaymentIntentMetadata, 'taxAutoCalculateFee'> {
  // Refunded original transaction/payment intent/charge
  refundedTransactionAmount: number;
  // Refunded Stripe collected fee
  refundedApplicationFeeAmount: number;
  // Transferred amount (e.g. via destination payment intent)
  transferAmount: number;
  // Reversed transaction amount from DESTINATION (e.g. connect account) to source (e.g. Platform)
  transferReversedAmount: number;
  // Platform account fee
  platformFee: number;
  // Stripe fee for processing transaction
  stripeFee: number;
  baseFee: number;
  extraFee: number;
  personalFee: number;
  destinationTransactionId?: string | null;
  transferId?: string | null;
  transferDestinationConnectAccountId?: string;
  paymentStatus?: StripeTransactionStatus;
  checkoutStatus?: StripeCheckoutStatus;
  errorMessage?: string;
  // Example: card_declined
  errorCode?: string;
  // Example: generic_decline
  declineCode?: string;
  // Stripe and platform fee payer
  feesPayer?: TransactionRole;
  extraRevenue?: number;
  // Amount that will charge for instant payout
  estimatedInstantPayoutFee?: number;
  // Original entity cost
  entityCost?: number;
  taxAutoCalculateFee?: number;
}

/**
 * Transaction entity
 */
interface ITransaction extends IEntity {
  id: string;
  transactionId?: string;
  // Stripe Tax Calculation API - calculated by Stripe tax for transaction (e.g. payment intent
  taxCalculationId?: string | null;
  // Stripe Tax Transaction API - Stripe tax transaction presented in Stripe Tax reports
  taxTransactionId?: string | null;
  // Represents a single attempt to move money into Platform Stripe account. Required for refunds, reversals, fees
  chargeId?: string | null;
  applicationFeeId?: string | null;
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
  personalFee?: number;
  status?: TransactionStatus;
  params?: IParams;
  createdAt?: Date;
  updatedAt?: Date;
  product?: IProduct;
  customer?: ICustomer;
}

export default ITransaction;

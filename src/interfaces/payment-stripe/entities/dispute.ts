import type { IEntity } from '@lomray/microservices-types';
import type DisputeReason from '../../../constants/payment-stripe/dispute-reason';
import type DisputeStatus from '../../../constants/payment-stripe/dispute-status';
import type { TCurrency } from '../interfaces';
import type IEvidenceDetails from './evidence-details';

export interface IMetadata {
  [key: string]: any;
}

export interface IParams {
  /**
   * If true, it’s still possible to refund the disputed payment. After the payment has been fully refunded,
   * no further funds are withdrawn from your Stripe account as a result of this dispute
   */
  isChargeRefundable: boolean;
  currency: TCurrency;
  issuedAt: Date;
  balanceTransactionId?: string | null;
  networkReasonCode?: string | null; // 10.4
  paymentMethodType?: string | null; // card
  paymentMethodBrand?: string | null; // visa
  [key: string]: any;
}

/**
 * Dispute (chargeback)
 * @description A dispute occurs when a customer questions your charge with their card issuer. When this happens, you have the opportunity to respond to the dispute with evidence that shows that the charge is legitimate.
 * If balance transaction occur - dispute is original chargeback, if not - dispute is injury chargeback
 */
interface IDispute extends IEntity {
  id?: string;
  // Transaction id of microservice transaction entity
  transactionId?: string | null;
  // Stripe transaction id (payment intent)
  disputeId?: string; // dp_1OJXjDAmQ4asS8PSWXnvmwpj
  // Disputed transaction amount. Cannot be greater than transaction amount
  amount?: number;
  // Total already charged amount from the account (platform or connected account)
  chargedAmount?: number;
  // Total already charged fee from the account (platform or connected account). For instance: stable dispute fee
  chargedFees?: number;
  // Dispute new worth related to the account (platform or connected account) after dispute related to this transaction
  netWorth?: number; // -12139
  // Required reason
  reason?: DisputeReason;
  // Required status
  status?: DisputeStatus;
  // Microservice entity params
  params?: IParams;
  // Stripe dispute params
  metadata?: IMetadata;
  // Received from Stripe date
  createdAt?: Date;
  updatedAt?: Date;
  evidenceDetails?: IEvidenceDetails;
}

export default IDispute;

import type { IEntity } from '@lomray/microservices-types';
import type PayoutMethod from '../../../constants/payment-stripe/payout-method';
import type PayoutStatus from '../../../constants/payment-stripe/payout-status';
import type PayoutType from '../../../constants/payment-stripe/payout-type';

interface IParams {
  [k: string]: any;
}

/**
 * Payout
 * @description A Payout object is created when you receive funds from Stripe, or when you initiate a payout
 * to either a bank account or debit card of a connected Stripe account. You can retrieve individual payouts,
 * and list all payouts. Payouts are made on varying schedules, depending on your country and industry.`
 */
interface IPayout extends IEntity {
  id?: string;
  // Stripe payout id
  payoutId?: string;
  // Min ±10 cents
  amount?: number;
  // Id of the bank account or card the payout is sent to.
  destination?: string;
  // The method used to send this payout
  method?: PayoutMethod;
  type?: PayoutType;
  /**
   * A payout is pending until it’s submitted to the bank, when it becomes in_transit.
   * The status changes to paid if the transaction succeeds, or to failed or canceled (within 5 business days).
   * Some payouts that fail might initially show as paid, then change to failed.
   */
  status?: PayoutStatus;
  currency?: string;
  failureCode?: string | null;
  failureMessage?: string | null;
  // An arbitrary meta information attached to stripe payout instance
  description?: string | null;
  // Date that you can expect the payout to arrive in the bank. This factors in delays to account for weekends or bank holidays
  arrivalDate?: Date;
  params?: IParams;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IPayout;

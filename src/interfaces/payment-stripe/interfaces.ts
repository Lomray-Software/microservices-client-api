import type TaxBehaviour from '../../constants/payment-stripe/tax-behaviour';

type TCapabilitiesStatus = 'active' | 'inactive' | 'pending';

type TCurrency = 'usd' | 'eur';

type TBalance = Record<TCurrency, number>;

type TRefundErrorReason =
  | 'charge_for_pending_refund_disputed'
  | 'declined'
  | 'expired_or_canceled_card'
  | 'insufficient_funds'
  | 'lost_or_stolen_card'
  | 'merchant_request'
  | 'unknown';

interface IFees {
  stablePaymentUnit: number;
  stableDisputeFeeUnit: number;
  paymentPercent: number;
  instantPayoutPercent: number;
}

interface ITax {
  id: string;
  transactionAmountWithTaxUnit: number;
  // If tax expired - tax CAN NOT BE attached to transaction
  expiresAt: Date;
  createdAt: Date;
  // Tax pure total amount
  totalAmountUnit: number;
  totalTaxPercent: number;
  behaviour: TaxBehaviour;
}

interface ITaxes {
  // Estimated default tax percent
  defaultPercent: number;
  // Create tax transaction fee
  stableUnit: number;
  // Tax auto Stripe calculation fee
  autoCalculateFeeUnit: number;
}

export { TCapabilitiesStatus, TCurrency, TBalance, IFees, ITax, ITaxes, TRefundErrorReason };

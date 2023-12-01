import type TransactionRole from '../../../../constants/payment-stripe/transaction-role';

interface IPaymentIntentFeesInput {
  entityCost: number;
  feesPayer?: TransactionRole;
  applicationPaymentPercent?: number;
  additionalFeesPercent?: Record<TransactionRole, number>;
  extraReceiverRevenuePercent?: number;
  shouldEstimateTax?: boolean;
  withStripeFee?: boolean;
}

interface IPaymentIntentFeesOutput {
  stripeUnitFee: number;
  platformUnitFee: number;
  userUnitAmount: number;
  receiverUnitRevenue: number;
  receiverAdditionalFee: number;
  senderAdditionalFee: number;
  extraReceiverUnitRevenue: number;
  estimatedTaxUnit?: number;
  estimatedTaxPercent?: number;
}

export { IPaymentIntentFeesInput, IPaymentIntentFeesOutput };

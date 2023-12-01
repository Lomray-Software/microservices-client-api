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
  stripeFee: number;
  platformFee: number;
  userUnitAmount: number;
  receiverRevenue: number;
  receiverAdditionalFee: number;
  senderAdditionalFee: number;
  extraReceiverRevenue: number;
  estimatedTax?: number;
  estimatedTaxPercent?: number;
}

export { IPaymentIntentFeesInput, IPaymentIntentFeesOutput };

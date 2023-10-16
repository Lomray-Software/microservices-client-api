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
  paymentProviderFee: number;
  applicationFee: number;
  userAmount: number;
  receiverRevenue: number;
  estimatedTaxPercent?: number;
  estimatedTax?: number;
}

export { IPaymentIntentFeesInput, IPaymentIntentFeesOutput };

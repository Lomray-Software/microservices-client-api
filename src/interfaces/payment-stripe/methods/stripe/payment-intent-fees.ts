import type TransactionRole from '../../../../constants/payment-stripe/transaction-role';

interface IPaymentIntentFeesInput {
  entityCost: number;
  feesPayer?: TransactionRole;
  applicationPaymentPercent?: number;
  additionalFeesPercent?: Record<TransactionRole, number>;
  extraReceiverRevenuePercent?: number;
}

interface IPaymentIntentFeesOutput {
  paymentProviderFee: number;
  applicationFee: number;
  userAmount: number;
  receiverRevenue: number;
}

export { IPaymentIntentFeesInput, IPaymentIntentFeesOutput };

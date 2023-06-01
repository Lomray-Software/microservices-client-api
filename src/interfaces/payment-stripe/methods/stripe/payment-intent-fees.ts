import type TransactionRole from 'constants/payment-stripe/transaction-role';

class IPaymentIntentFeesInput {
  entityCost: number;
  feesPayer?: TransactionRole;
  applicationPaymentPercent?: number;
  additionalFeesPercent?: Record<TransactionRole, number>;
  extraReceiverRevenuePercent?: number;
}

class IPaymentIntentFeesOutput {
  paymentProviderFee: number;
  applicationFee: number;
  userAmount: number;
  receiverRevenue: number;
}

export type { IPaymentIntentFeesInput, IPaymentIntentFeesOutput };

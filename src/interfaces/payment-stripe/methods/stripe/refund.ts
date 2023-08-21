import type RefundAmountType from '../../../../constants/payment-stripe/refund-amount-type';

interface IRefundInput {
  transactionId: string;
  amount?: number;
  refundAmountType?: RefundAmountType;
}

interface IRefundOutput {
  isInstantiated: boolean;
}

export { IRefundInput, IRefundOutput };

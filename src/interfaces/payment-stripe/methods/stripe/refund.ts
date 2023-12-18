import type RefundAmountType from '../../../../constants/payment-stripe/refund-amount-type';

interface IRefundInput {
  transactionId: string;
  amount?: number;
  refundAmountType?: RefundAmountType;
  type?: string;
}

interface IRefundOutput {
  isRecognized: boolean;
}

export { IRefundInput, IRefundOutput };

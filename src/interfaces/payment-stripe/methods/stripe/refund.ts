import type RefundAmountType from '../../../../constants/payment-stripe/refund-amount-type';
import type Refund from '../../entities/refund';

interface IRefundInput {
  transactionId: string;
  amount?: number;
  refundAmountType?: RefundAmountType;
}

interface IRefundOutput {
  entity: Refund;
}

export { IRefundInput, IRefundOutput };
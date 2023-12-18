import type { IEntity } from '@lomray/microservices-types';
import type RefundAmountType from '../../../constants/payment-stripe/refund-amount-type';
import type RefundStatus from '../../../constants/payment-stripe/refund-status';

export interface IRefundMetadata {
  entityId?: string;
  refundAmountType?: RefundAmountType;
  type?: string;
}

export interface IParams {
  // Example: re_3NhW8PAmQ4asS8PS0QPP80ER
  refundId?: string;
  // Reason for the refund, either user-provided
  reason?: string;
  // Error reason for failed refund
  errorReason?: string;
  refundAmountType?: RefundAmountType;
}

interface IRefund extends IEntity {
  id: string;
  transactionId?: string;
  amount?: number;
  entityId?: string | null;
  params?: IParams;
  status?: RefundStatus; // Default RefundStatus.INITIAL
  createdAt?: Date;
  updatedAt?: Date;
}

export default IRefund;

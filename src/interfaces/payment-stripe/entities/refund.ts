import type { IEntity } from '@lomray/microservices-types';
import type TransactionStatus from '../../../constants/payment-stripe/transaction-status';

interface IParams {
  // Example: re_3NhW8PAmQ4asS8PS0QPP80ER
  refundId?: string;
  // Reason for the refund, either user-provided
  reason?: string;
  // Error reason for failed refund
  errorReason?: string;
}

interface IRefund extends IEntity {
  id: string;
  transactionId: string;
  amount: number;
  entityId: string | null;
  params: IParams;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export default IRefund;

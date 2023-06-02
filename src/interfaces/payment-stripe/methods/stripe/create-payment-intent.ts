import type TransactionRole from 'constants/payment-stripe/transaction-role';
import type ITransaction from '../../entities/transaction';

interface ICreatePaymentIntentInput {
  userId: string;
  receiverId: string;
  entityCost: number;
  applicationPaymentPercent?: number;
  title?: string;
  cardId?: string;
  entityId?: string;
  feesPayer?: TransactionRole;
  additionalFeesPercent?: Record<TransactionRole, number>;
  extraReceiverRevenuePercent?: number;
}

interface ICreatePaymentIntentOutput {
  transaction: [ITransaction, ITransaction];
}

export { ICreatePaymentIntentInput, ICreatePaymentIntentOutput };

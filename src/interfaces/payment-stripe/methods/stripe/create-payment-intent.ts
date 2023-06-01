import type TransactionRole from 'constants/payment-stripe/transaction-role';
import type ITransaction from '../../entities/transaction';

class ICreatePaymentIntentInput {
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

class ICreatePaymentIntentOutput {
  transaction: [ITransaction, ITransaction];
}

export type { ICreatePaymentIntentInput, ICreatePaymentIntentOutput };

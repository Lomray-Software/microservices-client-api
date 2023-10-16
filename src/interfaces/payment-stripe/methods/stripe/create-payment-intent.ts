import type TransactionRole from '../../../../constants/payment-stripe/transaction-role';
import type ITransaction from '../../entities/transaction';
import type { IComputedTax } from '../../entities/transaction';

interface IPaymentIntentMetadata
  extends Omit<IComputedTax, 'taxTransactionAmountWithTaxUnit' | 'taxTotalAmountUnit'> {
  senderId: string;
  receiverId: string;
  entityCost: string;
  cardId: string;
  feesPayer: TransactionRole;
  applicationFee: string;
  receiverExtraFee: string;
  senderExtraFee: string;
  receiverExtraRevenue: string;
  paymentProviderFee: string;
  entityId?: string;
  title?: string;
  taxTransactionAmountWithTax?: number;
  taxTotalAmount?: number;
  taxFee?: number;
  totalTaxPercent?: number;
}

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
  withTax?: boolean;
}

interface ICreatePaymentIntentOutput {
  transaction: [ITransaction, ITransaction];
}

export { ICreatePaymentIntentInput, ICreatePaymentIntentOutput, IPaymentIntentMetadata };

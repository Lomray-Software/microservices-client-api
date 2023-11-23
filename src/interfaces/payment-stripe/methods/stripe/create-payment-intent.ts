import type TransactionRole from '../../../../constants/payment-stripe/transaction-role';
import type ITransaction from '../../entities/transaction';
import type { IComputedTax, IParams as ITransactionParams } from '../../entities/transaction';

interface IPaymentIntentMetadata
  extends Omit<IComputedTax, 'taxTransactionAmountWithTaxUnit' | 'taxTotalAmountUnit'>,
    Pick<ITransactionParams, 'baseFee'>,
    Pick<ITransaction, 'taxTransactionId' | 'taxCalculationId'> {
  senderId: string;
  receiverId: string;
  entityCost: string;
  cardId: string;
  feesPayer: TransactionRole;
  platformFee: string;
  receiverExtraFee: string;
  receiverPersonalFee: string;
  senderExtraFee: string;
  senderPersonalFee: string;
  receiverExtraRevenue: string;
  receiverRevenue: string;
  stripeFee: string;
  // Total collected fee (includes all fees and tax that collected via application fee)
  fee: string;
  entityId?: string;
  title?: string;
  taxTransactionAmountWithTax?: number;
  taxTotalAmount?: number;
  taxFee?: number;
  totalTaxPercent?: number;
  taxAutoCalculateFee?: number;
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

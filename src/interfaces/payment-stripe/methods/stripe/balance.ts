import type BalanceType from 'constants/payment-stripe/balance-type';
import type { TBalance } from '../../interfaces';

interface IBalanceInput {
  userId: string;
}

interface IBalanceOutput {
  balance: Record<BalanceType, TBalance>;
}

export { IBalanceInput, IBalanceOutput };

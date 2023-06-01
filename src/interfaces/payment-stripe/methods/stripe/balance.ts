import type BalanceType from 'constants/payment-stripe/balance-type';
import type { TBalance } from '../../interfaces';

class IBalanceInput {
  userId: string;
}

class IBalanceOutput {
  balance: Record<BalanceType, TBalance>;
}

export type { IBalanceInput, IBalanceOutput };

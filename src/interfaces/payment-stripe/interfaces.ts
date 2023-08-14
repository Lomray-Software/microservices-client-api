type TCapabilitiesStatus = 'active' | 'inactive' | 'pending';

type TCurrency = 'usd' | 'eur';

type TBalance = Record<TCurrency, number>;

interface IFees {
  stableUnit: number;
  paymentPercent: number;
}

export { TCapabilitiesStatus, TCurrency, TBalance, IFees };

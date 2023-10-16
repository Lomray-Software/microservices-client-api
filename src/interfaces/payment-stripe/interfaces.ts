import type TaxBehaviour from '../../constants/payment-stripe/tax-behaviour';

type TCapabilitiesStatus = 'active' | 'inactive' | 'pending';

type TCurrency = 'usd' | 'eur';

type TBalance = Record<TCurrency, number>;

interface IFees {
  stableUnit: number;
  paymentPercent: number;
}

interface ITax {
  id: string;
  transactionAmountWithTaxUnit: number;
  // If tax expired - tax CAN NOT BE attached to transaction
  expiresAt: Date;
  createdAt: Date;
  // Tax pure total amount
  totalAmountUnit: number;
  totalTaxPercent: number;
  behaviour: TaxBehaviour;
}

interface ITaxes {
  // Estimated default tax percent
  defaultPercent: number;
  // Stable cost unit for automatic compute tax
  stableUnit: number;
}

export { TCapabilitiesStatus, TCurrency, TBalance, IFees, ITax, ITaxes };

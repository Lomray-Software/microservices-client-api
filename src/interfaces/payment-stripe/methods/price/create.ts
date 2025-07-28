import type IPrice from '../../entities/price';

interface IPriceCreateInput {
  productId: string;
  currency: string;
  userId: string;
  unitAmount: number;
  metadata?: Record<string, any>;
}

interface IPriceCreateOutput {
  entity: IPrice;
}

export { IPriceCreateInput, IPriceCreateOutput };

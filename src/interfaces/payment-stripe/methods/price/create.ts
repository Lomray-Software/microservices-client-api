import type IPrice from '../../entities/price';

class IPriceCreateInput {
  productId: string;
  currency: string;
  userId: string;
  unitAmount: number;
}

class IPriceCreateOutput {
  entity: IPrice;
}

export type { IPriceCreateInput, IPriceCreateOutput };

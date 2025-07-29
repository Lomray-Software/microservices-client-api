import type IPrice from '../../entities/price';

interface IPriceCreateInput {
  productId: string;
  currency: string;
  userId: string;
  unitAmount?: number; // Optional when customUnitAmount is provided
  metadata?: Record<string, any>;
  customUnitAmount?: {
    enabled: boolean;
    preset?: number;
    minimum?: number;
    maximum?: number;
  };
}

interface IPriceCreateOutput {
  entity: IPrice;
}

export { IPriceCreateInput, IPriceCreateOutput };

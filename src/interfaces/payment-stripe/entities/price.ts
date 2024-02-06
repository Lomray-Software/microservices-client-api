import type { IEntity } from '@lomray/microservices-types';
import type IProduct from './product';

/**
 * Price entity
 */
interface IPrice extends IEntity {
  priceId: string;
  productId?: string;
  userId?: string;
  currency?: string;
  unitAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  product?: IProduct;
}

export default IPrice;

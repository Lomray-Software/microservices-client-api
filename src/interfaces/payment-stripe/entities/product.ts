import type { IEntity } from '@lomray/microservices-types';
import type IPrice from './price';
import type ITransaction from './transaction';

/**
 * Product entity
 */
interface IProduct extends IEntity {
  productId: string;
  entityId?: string;
  userId?: string | null;
  price?: IPrice;
  transactions?: ITransaction[];
}

export default IProduct;

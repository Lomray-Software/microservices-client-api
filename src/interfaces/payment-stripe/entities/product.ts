import type { IEntity } from '@lomray/microservices-types';
import type ICoupon from './coupon';
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
  coupons?: ICoupon[];
}

export default IProduct;

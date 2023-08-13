import type { IEntity } from '@lomray/microservices-types';
import type { TCouponDuration } from '../interfaces';
import type IProduct from './product';
import type IPromoCode from './promo-code';

/**
 * Coupon entity
 */
interface ICoupon extends IEntity {
  couponId: string;
  userId?: string | null;
  name?: string | null;
  amountOff?: number | null;
  percentOff?: number | null;
  duration?: TCouponDuration;
  durationInMonths?: number | null;
  maxRedemptions?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  products?: IProduct[];
  promoCodes: IPromoCode[];
}

export default ICoupon;

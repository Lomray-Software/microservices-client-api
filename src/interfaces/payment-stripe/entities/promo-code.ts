import type { IEntity } from '@lomray/microservices-types';
import type ICoupon from './coupon';

/**
 * Promo code entity
 */
interface IPromoCode extends IEntity {
  promoCodeId: string;
  code?: string;
  couponId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  coupon?: ICoupon;
}

export default IPromoCode;

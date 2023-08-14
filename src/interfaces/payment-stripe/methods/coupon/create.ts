import type CouponDuration from '../../../../constants/payment-stripe/coupon-duration';
import type ICoupon from '../../entities/coupon';
import type { TCurrency } from '../../interfaces';

interface ICreateCouponInput {
  duration: CouponDuration;
  products: string[];
  userId?: string;
  name?: string;
  currency?: TCurrency;
  amountOff?: number;
  percentOff?: number;
  durationInMonths?: number;
  maxRedemptions?: number;
}

interface ICreateCouponOutput {
  entity: ICoupon;
}

export type { ICreateCouponInput, ICreateCouponOutput };

import type ICoupon from '../../entities/coupon';
import type { TCouponDuration, TCurrency } from '../../interfaces';

interface ICreateCouponInput {
  duration: TCouponDuration;
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

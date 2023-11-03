import type { IEntity } from '@lomray/microservices-types';
import type ICart from './cart';
import type IPrice from './price';

interface ICartProductPrice extends IEntity {
  id: string;
  cartId?: string;
  priceId?: string;
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
  cart?: ICart;
  price?: IPrice;
}

export default ICartProductPrice;

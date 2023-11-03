import type { IEntity } from '@lomray/microservices-types';
import type ICartProductPrice from './cart-product-price';

interface ICart extends IEntity {
  id: string;
  userId?: string | null;
  // Using this field allows to store any additional data with the cart.
  params?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
  items?: ICartProductPrice[];
}

export default ICart;

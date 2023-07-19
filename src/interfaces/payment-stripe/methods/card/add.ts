import type ICard from '../../entities/card';

/**
 * Pass token or sensitive card data
 */
interface ICardAddInput {
  userId: string;
  // Stripe card token
  token?: string;
  // Sensitive card data
  digits?: string;
  expired?: string;
  cvc?: string;
}

interface ICardAddOutput {
  entity: ICard;
}

export { ICardAddInput, ICardAddOutput };

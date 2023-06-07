import type ICard from '../../entities/card';

interface ICardAddInput {
  userId: string;
  lastDigits: string;
  expired: string;
  funding: string;
  brand: string;
  holderName?: string;
  isDefault?: boolean;
  cardId?: string;
  paymentMethodId?: string;
}

interface ICardAddOutput {
  entity: ICard;
}

export { ICardAddInput, ICardAddOutput };

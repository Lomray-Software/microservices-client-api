import type ICard from '../../entities/card';

interface ICardAddInput {
  userId: string;
  expired: string;
  holderName: string;
  lastDigits: string;
  funding: string;
  cardId: string;
  isDefault?: boolean;
}

interface ICardAddOutput {
  entity: ICard;
}

export { ICardAddInput, ICardAddOutput };

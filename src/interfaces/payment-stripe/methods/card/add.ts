import type ICard from '../../entities/card';

class ICardAddInput {
  userId: string;
  expired: string;
  holderName: string;
  lastDigits: string;
  funding: string;
  cardId: string;
  isDefault?: boolean;
}

class ICardAddOutput {
  entity: ICard;
}

export type { ICardAddInput, ICardAddOutput };

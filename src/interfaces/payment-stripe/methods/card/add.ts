import type ICard from '../../entities/card';

interface ICardAddInput {
  userId: string;
  digits: string;
  expired: string;
  cvc: string;
}

interface ICardAddOutput {
  entity: ICard;
}

export { ICardAddInput, ICardAddOutput };

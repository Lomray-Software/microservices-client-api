interface IPayoutEntity {
  id: string;
  userId: string;
}

interface IPayoutInput {
  entities: IPayoutEntity[];
}

interface IPayoutOutput {
  isComplete: boolean;
}

export { IPayoutInput, IPayoutOutput };

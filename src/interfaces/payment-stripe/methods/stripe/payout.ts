interface IPayoutEntity {
  id: string;
  userId: string;
}

class IPayoutInput {
  entities: IPayoutEntity[];
}

class IPayoutOutput {
  isComplete: boolean;
}

export type { IPayoutInput, IPayoutOutput };

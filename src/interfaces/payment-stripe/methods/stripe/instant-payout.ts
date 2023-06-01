class ICreateInstantPayoutInput {
  userId: string;
  amount: number;
}

class ICreateInstantPayoutOutput {
  isInstantiated: boolean;
}

export type { ICreateInstantPayoutInput, ICreateInstantPayoutOutput };

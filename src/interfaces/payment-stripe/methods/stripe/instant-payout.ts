class IInstantPayoutInput {
  userId: string;
  amount: number;
}

class IInstantPayoutOutput {
  isInstantiated: boolean;
}

export type { IInstantPayoutInput, IInstantPayoutOutput };

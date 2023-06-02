interface IInstantPayoutInput {
  userId: string;
  amount: number;
}

interface IInstantPayoutOutput {
  isInstantiated: boolean;
}

export { IInstantPayoutInput, IInstantPayoutOutput };

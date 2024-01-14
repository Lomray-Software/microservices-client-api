enum PayoutMethodType {
  CARD = 'card',
  BANK_ACCOUNT = 'bankAccount',
}

interface IInstantPayoutInput {
  userId: string;
  amount: number;
  entityId?: string;
  payoutMethodId?: string;
  payoutMethodType?: PayoutMethodType;
}

interface IInstantPayoutOutput {
  isInstantiated: boolean;
}

export { IInstantPayoutInput, IInstantPayoutOutput, PayoutMethodType };

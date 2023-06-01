class ISetupIntentInput {
  userId: string;
}

class ISetupIntentOutput {
  clientSecretToken: string | null;
}

export type { ISetupIntentInput, ISetupIntentOutput };

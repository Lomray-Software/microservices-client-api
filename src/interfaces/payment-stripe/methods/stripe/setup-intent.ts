interface ISetupIntentInput {
  userId: string;
}

interface ISetupIntentOutput {
  clientSecretToken: string | null;
}

export { ISetupIntentInput, ISetupIntentOutput };

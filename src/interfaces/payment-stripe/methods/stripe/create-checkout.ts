class ICreateCheckoutInput {
  priceId: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}

class ICreateCheckoutOutput {
  redirectUrl: string | null;
}

export type { ICreateCheckoutInput, ICreateCheckoutOutput };

interface ICreateCheckoutInput {
  priceId: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}

interface ICreateCheckoutOutput {
  redirectUrl: string | null;
}

export { ICreateCheckoutInput, ICreateCheckoutOutput };

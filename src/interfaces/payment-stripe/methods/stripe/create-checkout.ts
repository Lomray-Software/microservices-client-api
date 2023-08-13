interface ICreateCheckoutInput {
  priceId: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
  isAllowPromoCode?: boolean;
}

interface ICreateCheckoutOutput {
  redirectUrl: string | null;
}

export { ICreateCheckoutInput, ICreateCheckoutOutput };

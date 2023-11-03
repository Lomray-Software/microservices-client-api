interface ICreateCartCheckoutInput {
  cartId: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}

interface ICreateCartCheckoutOutput {
  redirectUrl: string | null;
}

export { ICreateCartCheckoutInput, ICreateCartCheckoutOutput };

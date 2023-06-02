import type StripeAccountTypes from '../../../../constants/payment-stripe/stripe-account-types';

interface IConnectAccountInput {
  userId: string;
  email: string;
  accountType: StripeAccountTypes;
  refreshUrl: string;
  returnUrl: string;
}

interface IConnectAccountOutput {
  accountLink: string;
}

export { IConnectAccountInput, IConnectAccountOutput };

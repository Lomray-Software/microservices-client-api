import type StripeAccountTypes from 'constants/payment-stripe/stripe-account-types';

class IConnectAccountInput {
  userId: string;
  email: string;
  accountType: StripeAccountTypes;
  refreshUrl: string;
  returnUrl: string;
}

class IConnectAccountOutput {
  accountLink: string;
}

export type { IConnectAccountInput, IConnectAccountOutput };

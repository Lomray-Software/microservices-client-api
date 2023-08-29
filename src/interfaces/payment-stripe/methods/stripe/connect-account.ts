import type BusinessType from '../../../../constants/payment-stripe/business-type';
import type StripeAccountTypes from '../../../../constants/payment-stripe/stripe-account-types';

interface IConnectAccountInput {
  userId: string;
  email: string;
  accountType: StripeAccountTypes;
  refreshUrl: string;
  returnUrl: string;
  businessType?: BusinessType;
}

interface IConnectAccountOutput {
  accountLink: string;
}

export { IConnectAccountInput, IConnectAccountOutput };

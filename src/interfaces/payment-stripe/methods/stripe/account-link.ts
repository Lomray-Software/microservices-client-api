class IConnectAccountLinkInput {
  userId: string;
  refreshUrl: string;
  returnUrl: string;
}

class IConnectAccountLinkOutput {
  accountLink: string;
}

export type { IConnectAccountLinkInput, IConnectAccountLinkOutput };

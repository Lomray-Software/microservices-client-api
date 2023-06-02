interface IConnectAccountLinkInput {
  userId: string;
  refreshUrl: string;
  returnUrl: string;
}

interface IConnectAccountLinkOutput {
  accountLink: string;
}

export { IConnectAccountLinkInput, IConnectAccountLinkOutput };

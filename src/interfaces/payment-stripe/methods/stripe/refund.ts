interface IRefundInput {
  transactionId: string;
}

interface IRefundOutput {
  isInstantiated: boolean;
}

export { IRefundInput, IRefundOutput };

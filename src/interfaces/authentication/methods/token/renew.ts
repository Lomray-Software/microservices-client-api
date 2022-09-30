enum TokenCreateReturnType {
  cookies = 'cookies',
  directly = 'directly',
}

interface ITokenRenewInput {
  access?: string; // also, available through cookies
  refresh: string;
  returnType: TokenCreateReturnType;
}

interface ITokenRenewOutput {
  access?: string; // or set through cookies
  refresh: string;
}

export type { ITokenRenewInput, ITokenRenewOutput };

export { TokenCreateReturnType };

import type TokenCreateReturnType from '../../../../constants/token-return-type';
import type TokenType from '../../../../constants/token-type';

interface ITokenCreateInput {
  type: TokenType;
  userId: string;
  expirationAt?: number;
  params?: Record<string, any> & { maxAge?: number };
  jwtPayload?: Record<string, any>;
  returnType: TokenCreateReturnType;
}

interface ITokenCreateOutput {
  access?: string;
  refresh?: string;
  token?: string;
  payload?: { cookies: Record<string, any>[] };
}

export { ITokenCreateInput, ITokenCreateOutput };

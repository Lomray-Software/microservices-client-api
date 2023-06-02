import type IBankAccount from '../../entities/bank-account';

interface IBankAccountAddInput {
  userId: string;
  lastDigits: string;
  holderName?: string | null;
  bankName?: string | null;
  bankAccountId?: string;
}

interface IBankAccountAddOutput {
  entity: IBankAccount;
}

export { IBankAccountAddInput, IBankAccountAddOutput };

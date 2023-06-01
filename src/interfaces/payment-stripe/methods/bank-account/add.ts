import type IBankAccount from '../../entities/bank-account';

class IBankAccountAddInput {
  userId: string;
  lastDigits: string;
  holderName?: string | null;
  bankName?: string | null;
  bankAccountId?: string;
}

class IBankAccountAddOutput {
  entity: IBankAccount;
}

export type { IBankAccountAddInput, IBankAccountAddOutput };

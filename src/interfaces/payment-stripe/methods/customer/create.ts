import type ICustomer from '../../entities/customer';

interface ICustomerCreateInput {
  userId: string;
}

class ICustomerCreateOutput {
  entity: ICustomer;
}

export type { ICustomerCreateInput, ICustomerCreateOutput };

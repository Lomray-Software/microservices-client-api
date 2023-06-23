import type ICustomer from '../../entities/customer';

interface ICustomerCreateInput {
  userId: string;
  email: string;
  name: string;
}

interface ICustomerCreateOutput {
  entity: ICustomer;
}

export { ICustomerCreateInput, ICustomerCreateOutput };

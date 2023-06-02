import type ICustomer from '../../entities/customer';

interface ICustomerCreateInput {
  userId: string;
}

interface ICustomerCreateOutput {
  entity: ICustomer;
}

export { ICustomerCreateInput, ICustomerCreateOutput };

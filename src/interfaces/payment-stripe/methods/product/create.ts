import type IProduct from '../../entities/product';

interface IProductCreateInput {
  entityId: string;
  name: string;
  userId: string;
  description?: string;
  images?: string[];
}

interface IProductCreateOutput {
  entity: IProduct;
}

export { IProductCreateInput, IProductCreateOutput };

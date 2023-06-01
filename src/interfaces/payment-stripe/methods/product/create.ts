import type IProduct from '../../entities/product';

class IProductCreateInput {
  entityId: string;
  name: string;
  userId: string;
  description?: string;
  images?: string[];
}

class IProductCreateOutput {
  entity: IProduct;
}

export type { IProductCreateInput, IProductCreateOutput };

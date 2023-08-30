import type { IEntity } from '@lomray/microservices-types';
import type IArticle from './article';

interface ICategory extends IEntity {
  id: string;
  alias: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  articles?: IArticle[];
}

export default ICategory;

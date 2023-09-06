import type { IEntity } from '@lomray/microservices-types';
import type ICategory from './category';

interface IArticle extends IEntity {
  id: string;
  alias: string;
  userId?: string | null;
  title?: string;
  description?: string;
  content?: string;
  publishDate?: string | null;
  extra?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
  categories?: ICategory[];
}

export default IArticle;

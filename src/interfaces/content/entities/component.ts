import type { IEntity } from '@lomray/microservices-types';
import type { ISchema } from '../interfaces';
import type ISingleType from './single-type';

/**
 * Content component entity
 */
interface IComponent extends IEntity {
  id: string;
  alias?: string;
  title?: string;
  schema?: ISchema[];
  createdAt?: Date;
  updatedAt?: Date;
  singleTypes?: ISingleType[];
  parent?: IComponent[];
  children?: IComponent[];
}

export default IComponent;

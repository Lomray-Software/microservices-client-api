import type { RequiredProps } from '@lomray/client-helpers/interfaces';
import type { IEntity } from '@lomray/microservices-types';
import type { ISingleTypeValue } from '../interfaces';
import type IComponent from './component';

/**
 * Content single type entity
 */
interface ISingleType extends IEntity {
  id: string;
  alias?: string;
  value?: ISingleTypeValue;
  createdAt?: Date;
  updatedAt?: Date;
  components?: RequiredProps<IComponent, 'id'>[];
}

export default ISingleType;

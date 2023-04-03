import type { IEntity } from '@lomray/microservices-types';
import type FilterOperator from '../../../constants/authorization/filter-operator';
import type { IFilter } from './filter';
import type { IMethod } from './method';
import type { IRole } from './role';

/**
 * Method filter
 */
export interface IMethodFilter extends IEntity {
  methodId: number;
  filterId: number;
  operator?: FilterOperator;
  roleAlias?: string;
  createdAt?: Date;
  updatedAt?: Date;
  filter?: IFilter;
  method?: IMethod;
  role?: IRole;
}

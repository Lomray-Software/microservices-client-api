import type { IEntity } from '@lomray/microservices-types';
import type { ICondition } from './condition';
import type { IMethodFilter } from './method-filter';
import type { IModel } from './model';

/**
 * Method
 */
export interface IMethod extends IEntity {
  id: number;
  microservice?: string;
  method?: string;
  description?: string;
  allowGroup?: string[];
  modelInId?: number | null;
  modelOutId?: number | null;
  conditionId?: number | null;
  denyGroup?: string[];
  createdAt?: string;
  updatedAt?: string;
  modelIn?: IModel;
  modelOut?: IModel;
  methodFilters?: IMethodFilter[];
  condition?: ICondition;
}

import type { IEntity, IJsonQuery, ITypeormJsonQueryOptions } from '@lomray/microservices-types';
import type FilterIgnoreType from '../../../constants/authorization/filter-ignore-type';
import type { IMethodFilter } from './method-filter';

/**
 * Filter
 */
export interface IFilter extends IEntity {
  id: number;
  title?: string;
  condition?: {
    options?: Partial<ITypeormJsonQueryOptions>;
    query?: IJsonQuery;
    methodOptions?: {
      isAllowMultiple?: boolean;
      isSoftDelete?: boolean;
      isListWithCount?: boolean;
      isParallel?: boolean;
      shouldReturnEntity?: boolean;
      shouldResetCache?: boolean;
    };
  };
  ignore?: { [role: string]: FilterIgnoreType };
  createdAt?: string;
  updatedAt?: string;
  filterMethods?: IMethodFilter[];
}

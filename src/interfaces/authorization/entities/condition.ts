import type { IEntity, IJsonQuery, JQJunction } from '@lomray/microservices-types';
import type { IMethod } from './method';

export interface IConditionRequest {
  isParallel?: boolean;
  // lodash template
  method: string;
  // can include lodash template

  params?: {
    query?: IJsonQuery;
  };
}

export interface IConditionalSwitchRequest {
  switch: {
    value: string;
    cases: {
      [key: string]: IConditionRequest;
    };
  };
}

export interface IEntityCondition {
  requests?: {
    [key: string]: IConditionRequest | IConditionalSwitchRequest;
  };
  // lodash template
  template: string;
}

export type IConditions =
  | {
      [JQJunction.and]?: IConditions[];
    }
  | {
      [JQJunction.or]?: IConditions[];
    }
  | IEntityCondition;

/**
 * Condition
 */
export interface ICondition extends IEntity {
  id: number;
  title?: string;
  conditions?: IConditions;
  createdAt?: string;
  updatedAt?: string;
  methods?: IMethod[];
}

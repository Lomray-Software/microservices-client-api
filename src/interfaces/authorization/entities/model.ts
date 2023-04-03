import type { IEntity } from '@lomray/microservices-types';
import type FieldPolicy from '../../../constants/authorization/field-policy';

export type IFieldCondition =
  | {
      template: string; // lodash template
    }
  | {
      condition: string; // lodash template, should return 'true' for pass
    };

export interface IRolePermissions {
  [roleAliasOrUserId: string]: FieldPolicy | IFieldCondition;
}

export interface IFieldPermission {
  in?: IRolePermissions;
  out?: IRolePermissions;
  isCustom?: boolean;
}

export interface IModelSchema {
  '*': FieldPolicy;
  [fieldName: string]:
    | string // related model alias
    | ({ object: IModelSchema | string } & IFieldPermission) // can be is object or related model alias
    | {
        case: { template: string };
        object: { [key: string]: string | IModelSchema };
        isCustom?: boolean;
      }
    | IFieldPermission;
}

/**
 * Model
 */
export interface IModel extends IEntity {
  id: number;
  microservice?: string | null;
  alias?: string;
  title?: string;
  schema?: IModelSchema;
  createdAt?: string;
  updatedAt?: string;
}

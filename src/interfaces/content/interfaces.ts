import type { JQFieldType } from '@lomray/microservices-types';
import type InputType from '../../constants/content/input-type';

/**
 * Interface for single-type value
 * NOTES: Schema for static single-type data
 * This entity contain components that declared with the related data to it
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISingleTypeValue {}

/**
 * Input types that can be used in components creating
 */
interface IBaseSchema {
  type: InputType;
  name: string;
  title: string;
}

interface IRelation {
  microservice: string;
  entity: string;
  searchFields: {
    name: string;
    insensitive?: boolean;
    castType?: JQFieldType;
  }[];
  idFields: string[];
  titleFields: string[];
  hasMany: boolean;
}

/**
 * Primitive input types: Text, Number, Rich Text, Date, Boolean, Email, Password, JSON, ENUM
 */
interface IDefaultSchema extends IBaseSchema {}

/**
 * Text input type options
 */
interface ILongTextSchema extends IDefaultSchema {
  isLong: true;
}

/**
 * Relation input types: Relation, Media
 */
interface IRelationSchema extends IBaseSchema {
  relation: IRelation;
}

/**
 * Relation input types: Media
 */
interface IFileSchema extends IRelationSchema {
  isFiles: true;
}

/**
 * Custom input type: Component
 */
interface IComponentSchema extends IBaseSchema {
  id: string;
  hasMany: boolean;
}

type ISchema = IDefaultSchema | IRelationSchema | IComponentSchema | IFileSchema | ILongTextSchema;

export type {
  ISingleTypeValue,
  ISchema,
  IBaseSchema,
  IDefaultSchema,
  IRelationSchema,
  IComponentSchema,
  IRelation,
  IFileSchema,
  ILongTextSchema,
};

import type InputType from 'constants/content/input-type';

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
  hasMany: boolean;
}

/**
 * Primitive input types: Text, Number, Rich Text, Date, Boolean, Email, Password, JSON, ENUM
 */
interface IDefaultSchema extends IBaseSchema {}

/**
 * Relation input types: Relation, Media
 */
interface IRelationSchema extends IBaseSchema {
  relation: IRelation;
}

/**
 * Custom input type: Component
 */
interface IComponentSchema extends IBaseSchema, Pick<IRelation, 'hasMany'> {
  id: string;
}

type ISchema = IDefaultSchema | IRelationSchema | IComponentSchema;

export type { ISingleTypeValue, ISchema, IBaseSchema, IDefaultSchema, IComponentSchema, IRelation };

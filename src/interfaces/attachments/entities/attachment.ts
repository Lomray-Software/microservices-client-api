import type { IEntity } from '@lomray/microservices-types';
import type IAttachmentEntity from './attachment-entity';

export enum Formats {
  thumbnail = 'thumbnail',
  medium = 'medium',
  small = 'small',
  large = 'large',
  extraLarge = 'extra-large',
}

interface IAttachmentMeta {
  mime: string;
  size?: number;
  width?: number;
  height?: number;
  hasWebp: boolean;
}

export type IAttachmentFormat = {
  url: string;
  width: number;
  height: number;
  size: number;
  hasWebp?: boolean;
};

export interface IAttachment extends IEntity {
  id: string;
  userId: string;
  url: string;
  alt: string;
  type: string;
  formats: { [key in Formats]: IAttachmentFormat };
  meta: IAttachmentMeta;
  attachmentEntities: IAttachmentEntity[];
}

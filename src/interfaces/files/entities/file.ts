import type { IEntity } from '@lomray/microservices-types';
import type Formats from '../../../constants/formats';
import type IFileEntity from './file-entity';
import type IFolder from './folder';

interface IFileMeta {
  mime: string;
  size?: number;
  width?: number;
  height?: number;
  hasWebp: boolean;
}

export type IImageFormat = {
  url: string;
  width: number;
  height: number;
  size: number;
  hasWebp?: boolean;
};

export interface IFile extends IEntity {
  id: string;
  userId?: string | null;
  folderId?: string | null;
  url?: string;
  alt?: string;
  type?: string;
  formats?: { [key in Formats]: IImageFormat };
  meta?: IFileMeta;
  createdAt?: string;
  updatedAt?: string;
  fileEntities?: IFileEntity[];
  folder?: IFolder;
}

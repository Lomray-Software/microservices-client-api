import type { IEntity } from '@lomray/microservices-types';
import type { IFile } from './file';

interface IFolder extends IEntity {
  id: string;
  userId?: string | null;
  alias?: string;
  title?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
  parent?: IFolder[];
  children?: IFolder[];
  files?: IFile[];
}

export default IFolder;

import type { IEntity } from '@lomray/microservices-types';
import type { IFile } from './file';

interface IFileEntity extends IEntity {
  id: string;
  entityId?: string;
  fileId?: string;
  type?: string;
  microservice?: string;
  order?: number;
  createdAt?: number;
  file?: IFile;
}

export default IFileEntity;

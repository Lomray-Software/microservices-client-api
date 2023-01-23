import type { IEntity } from '@lomray/microservices-types';

interface IFileEntity extends IEntity {
  id: string;
  entityId?: string;
  fileId?: string;
  type?: string;
  microservice?: string;
  order?: number;
  createdAt?: number;
}

export default IFileEntity;

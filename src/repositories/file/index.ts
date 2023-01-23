import type { IFile, IImageFormat } from '../../interfaces/files/entities/file';

type TBaseEntity = { id: string; files?: IFile[] };

/**
 * File entity methods
 */
class File {
  /**
   * Get any files format
   */
  static getAnyFileFormat(file?: IFile): IImageFormat | undefined {
    if (!file) {
      return;
    }

    const formats = Object.values(file?.formats ?? {});

    return formats?.[formats.length - 1];
  }

  /**
   * Assign entities files
   */
  static assignEntitiesFiles = <TEntity extends TBaseEntity>(
    entities: TEntity[],
    files?: IFile[],
    customAssign: ((entity: TEntity, files: IFile[]) => void) | string = 'files',
  ): void => {
    const entityFiles = files?.reduce((res, { fileEntities, ...file }) => {
      // index files by entity id
      fileEntities?.forEach((fileEntity) => {
        if (!res[fileEntity.entityId!]) {
          res[fileEntity.entityId!] = [];
        }

        res[fileEntity.entityId!].push({
          ...file,
          fileEntities: [fileEntity],
        });
      });

      return res;
    }, {});

    // Assign files to entity
    entities?.forEach((entity) => {
      if (typeof customAssign === 'function') {
        customAssign(entity, entityFiles?.[entity.id] as IFile[]);
      } else {
        entity[customAssign] = entityFiles?.[entity.id];
      }
    });
  };

  /**
   * Sort files by order
   */
  static sortFilesOrder = (a: IFile, b: IFile) =>
    Number(a.fileEntities?.[0].order) > Number(b.fileEntities?.[0].order) ? 1 : -1;
}

export default File;

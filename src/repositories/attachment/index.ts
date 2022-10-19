import type {
  IAttachment,
  IAttachmentFormat,
} from '../../interfaces/attachments/entities/attachment';

type TBaseEntity = { id: string; attachments?: IAttachment[] };

/**
 * Attachment entity methods
 */
class Attachment {
  /**
   * Get any attachment format
   */
  static getAnyAttachmentFormat(attachment?: IAttachment): IAttachmentFormat | undefined {
    if (!attachment) {
      return;
    }

    const formats = Object.values(attachment?.formats ?? {});

    return formats?.[formats.length - 1];
  }

  /**
   * Assign entities attachments
   */
  static assignEntitiesAttachments = <TEntity extends TBaseEntity>(
    entities: TEntity[],
    attachments?: IAttachment[],
    customAssign: ((entity: TEntity, attachments: IAttachment[]) => void) | string = 'attachments',
  ): void => {
    const entityAttachments = attachments?.reduce((res, { attachmentEntities, ...attachment }) => {
      // index attachments by entity id
      attachmentEntities?.forEach((attachmentEntity) => {
        if (!res[attachmentEntity.entityId!]) {
          res[attachmentEntity.entityId!] = [];
        }

        res[attachmentEntity.entityId!].push({
          ...attachment,
          attachmentEntities: [attachmentEntity],
        });
      });

      return res;
    }, {});

    // Assign attachments to entity
    entities?.forEach((entity) => {
      if (typeof customAssign === 'function') {
        customAssign(entity, entityAttachments?.[entity.id] as IAttachment[]);
      } else {
        entity[customAssign] = entityAttachments?.[entity.id];
      }
    });
  };

  /**
   * Sort attachment by order
   */
  static sortAttachmentsOrder = (a: IAttachment, b: IAttachment) =>
    Number(a.attachmentEntities?.[0].order) > Number(b.attachmentEntities?.[0].order) ? 1 : -1;
}

export default Attachment;

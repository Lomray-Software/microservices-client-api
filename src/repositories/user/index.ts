import type { IJsonQuery, IQuery } from '@lomray/microservices-types';
import Formats from '../../constants/formats';
import type Endpoints from '../../endpoints';
import type { IFile } from '../../interfaces/files/entities/file';
import type IUser from '../../interfaces/users/entities/user';
import FileEntity from '../file';

/**
 * User entity
 */
class User {
  /**
   * Get user avatar or default image
   */
  static getAvatarUrl(user: IUser | null, format: Formats = Formats.medium): string | undefined {
    const uri =
      user?.avatar?.formats?.[format]?.url ?? FileEntity.getAnyFileFormat(user?.avatar)?.url;

    return uri || user?.profile?.photo;
  }

  /**
   * Get user avatar
   */
  static getName(user?: IUser | null): string {
    const { firstName, lastName } = user || {};

    return [firstName, lastName].join(' ');
  }

  /**
   * Assign avatars to users
   */
  static assignAvatars(users: IUser[], avatars: IFile[]): void {
    FileEntity.assignEntitiesFiles(users, avatars, (user, files) => {
      user.avatar = files?.[0];
    });
  }

  /**
   * Get a list of avatar for a user
   */
  static assignAvatar = (user: IUser, avatar?: IFile | IFile[] | null): void => {
    user.avatar = Array.isArray(avatar) ? avatar[avatar.length - 1] : avatar || undefined;
  };

  /**
   * Request user
   */
  static requestUser = async (
    api: Endpoints<Endpoints>,
    {
      userId,
      imgSize = Formats.medium,
      extraAttr = [],
    }: { userId?: string; imgSize?: Formats; extraAttr?: IJsonQuery<IUser>['attributes'] } = {},
  ): Promise<IUser | undefined> => {
    // Get user and his avatar
    const [{ result, error }, { result: resultAvatar }] = await api.batch((batchApi) => [
      batchApi.users.user[userId ? 'view' : 'me']<IQuery<IUser>>({
        query: {
          attributes: ['id', 'firstName', 'lastName', 'username', 'profile.photo', ...extraAttr],
          relations: ['profile'],
          ...(userId ? { where: { id: userId } } : {}),
        },
      }),
      batchApi.files.file.list({
        query: {
          attributes: ['id', 'formats', 'fileEntities.order'],
          relations: ['fileEntities'],
          where: {
            // try to get only first image
            and: [
              {
                'fileEntities.entityId': userId,
              },
              {
                'fileEntities.order': 1,
              },
            ],
          },
        },
        payload: {
          onlyFormats: [Formats.thumbnail, imgSize],
        },
      }),
    ]);

    if (error || !result) {
      return;
    }

    const { entity } = result;

    if (resultAvatar) {
      User.assignAvatar(entity, resultAvatar.list);
    }

    return entity;
  };
}

export default User;

import AppError from '@shared/errors/AppError';
import User from '../infra/database/entities/Users';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUsersRepository } from '../domain/repositories/IUserRepositories';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class UpdateUserAvatarService {
  constructor(@inject('UsersRepository') private readonly usersRepositories: IUsersRepository) { }
  async execute({ userId, avatarFileName }: IUpdateUserAvatar): Promise<User> {
    const user = await this.usersRepositories.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepositories.save(user);

    return user;
  }
}

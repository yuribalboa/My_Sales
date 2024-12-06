import AppError from '@shared/errors/AppError';
import User from '../infra/database/entities/Users';
import { IShowProfile } from '../domain/models/IShowProfile';
import { IUsersRepository } from '../domain/repositories/IUserRepositories';

export default class ShowProfileService {
  constructor(private readonly usersRepositories: IUsersRepository) { }

  async execute({ user_id }: IShowProfile): Promise<User> {
    const user = await this.usersRepositories.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

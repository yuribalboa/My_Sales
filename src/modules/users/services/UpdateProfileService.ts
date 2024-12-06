import AppError from '@shared/errors/AppError';
import User from '../infra/database/entities/Users';
import { compare, hash } from 'bcrypt';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUsersRepository } from '../domain/repositories/IUserRepositories';

export default class UpdateProfileService {
  constructor(private readonly usersRepositories: IUsersRepository) { }
  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<User> {
    const user = await this.usersRepositories.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (email) {
      const userUpdateEmail = await this.usersRepositories.findByEmail(email);

      if (userUpdateEmail) {
        throw new AppError('There is already one user with this email.', 409);
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 10);
    }

    if (name) {
      user.name = name;
    }

    await this.usersRepositories.save(user);

    return user;
  }
}

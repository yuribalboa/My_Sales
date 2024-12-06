import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcrypt';
import { IResetPassword } from '../domain/models/IResetPassword';
import { IUsersRepository } from '../domain/repositories/IUserRepositories';
import { IUserTokensRepository } from '../domain/repositories/IUserTokenRepository';

export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepositories: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepositories: IUserTokensRepository,
  ) {}

  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepositories.findByToken(token);

    if (!userToken) {
      throw new AppError('User token not exists.', 404);
    }

    const user = await this.usersRepositories.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not exists.', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', 401);
    }

    user.password = await hash(password, 10);

    await this.usersRepositories.save(user);
  }
}

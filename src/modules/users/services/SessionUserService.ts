import AppError from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { Secret, sign } from 'jsonwebtoken';
import { ISessionUser } from '../domain/models/ISessionUser';
import { ISessionResponse } from '../domain/models/ISessionResponse';
import { IUsersRepository } from '../domain/repositories/IUserRepositories';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class SessionUserService {
  constructor(@inject('UsersRepository') private readonly usersRepositories: IUsersRepository) { }

  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    const user = await this.usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, process.env.APP_SECRET as Secret, {
      subject: String(user.id),
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

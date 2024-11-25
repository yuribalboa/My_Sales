import AppError from '@shared/errors/AppError';
import User from '../database/entities/Users';
import { usersRepositories } from '../database/repositories/UsersRepositories';
import { hash } from 'bcrypt';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await usersRepositories.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address is already used.', 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepositories.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepositories.save(user);

    return user;
  }
}

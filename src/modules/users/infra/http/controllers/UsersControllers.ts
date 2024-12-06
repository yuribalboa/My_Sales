import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import { container } from 'tsyringe';

export default class UsersControllers {
  async index(request: Request, response: Response) {
    const { page, skip, take } = request.query;

    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute({
      page: Number(page),
      skip: Number(skip),
      take: Number(take),
    });

    response.json(instanceToInstance(users));
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      name,
      email,
      password,
    });
    response.json(instanceToInstance(user));
  }
}

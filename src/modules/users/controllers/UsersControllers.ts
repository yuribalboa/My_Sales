import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';
import { instanceToInstance } from 'class-transformer';

export default class UsersControllers {
  async index(request: Request, response: Response) {
    const listUsersService = new ListUserService();
    const users = await listUsersService.execute();
    response.json(instanceToInstance(users));
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });
    response.json(instanceToInstance(user));
  }
}

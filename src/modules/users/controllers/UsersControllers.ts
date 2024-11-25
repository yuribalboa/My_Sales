import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

export default class UsersControllers {
  async index(request: Request, response: Response) {
    const listUsersService = new ListUserService();
    const users = await listUsersService.execute();
    response.json(users);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const showProductService = new ShowProductService();
    const product = await showProductService.execute({ id });
    response.json(product);
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });
    response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const updateProductService = new UpdateProductService();
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });
    response.json(product);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute({ id });
    response.status(204).send([]);
  }
}

import { Request, Response } from 'express';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomerService from '@modules/customers/services/ListCustomerService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import { container } from 'tsyringe';

export default class CustomersController {
  async index(request: Request, response: Response) {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const listCustomers = container.resolve(ListCustomerService);
    const customers = await listCustomers.execute(page, limit);

    response.json(customers);
  }

  async show(request: Request, response: Response) {
    const id = Number(request.params.id);

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute({ id });

    response.json(customer);
  }

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email,
    });

    response.json(customer);
  }

  async update(request: Request, response: Response) {
    const { name, email } = request.body;
    const id = Number(request.params.id);

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    response.json(customer);
  }

  async delete(request: Request, response: Response) {
    const id = Number(request.params.id);

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    response.status(204).json([]);
  }
}

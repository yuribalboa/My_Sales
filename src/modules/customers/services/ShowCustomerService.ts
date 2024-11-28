import { customerRepository } from '../database/repositories/CustomerRepositories';
import { Customer } from '../database/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    return customer;
  }
}

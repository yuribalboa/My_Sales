import { customerRepository } from '../database/repositories/CustomerRepositories';
import { Customer } from '../database/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IDeleteCustomer {
  id: number;
}

export default class DeleteCustomerService {
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    await customerRepository.remove(customer);
  }
}

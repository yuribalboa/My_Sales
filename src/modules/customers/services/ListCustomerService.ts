import { customerRepository } from '../database/repositories/CustomerRepositories';
import { Customer } from '../database/entities/Customer';

export default class ListCustomerService {
  async execute(): Promise<Customer[]> {
    const customers = await customerRepository.find();
    return customers;
  }
}

import { Customer } from '../infra/database/entities/Customer';
import AppError from '@shared/errors/AppError';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositories';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customerRepository: ICustomersRepository,
  ) {}
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    return customer;
  }
}

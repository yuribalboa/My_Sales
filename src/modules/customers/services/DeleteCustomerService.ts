import AppError from '@shared/errors/AppError';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositories';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customerRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    await this.customerRepository.remove(customer);
  }
}

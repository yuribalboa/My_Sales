import AppError from '@shared/errors/AppError';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepositories';
import { IOrder } from '../domain/models/IOrder';

export default class ShowOrderService {
  constructor(private readonly orderRepository: IOrdersRepository){}

  async execute(id: IShowOrder): Promise<IOrder> {
    const order = await this.orderRepository.findById(Number(id));

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

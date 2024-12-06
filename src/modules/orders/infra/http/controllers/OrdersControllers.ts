import { Request, Response } from 'express';
import { CreateOrderService } from '../../../services/CreateOrderService';
import { container } from 'tsyringe';
import ShowOrderService from '@modules/orders/services/ShowOrderService';

export default class OrdersController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    response.json(order);
  }

  async create(request: Request, response: Response) {
    const { customer, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer,
      products,
    });

    response.json(order);
  }
}

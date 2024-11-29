import { Request, Response } from 'express';
import { ShowOrderService } from '../services/ShowOrderService';
import { CreateOrderService } from '../services/CreateOrderService';

export default class OrdersController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute(id);

    response.json(order);
  }

  async create(request: Request, response: Response) {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    response.json(order);
  }
}

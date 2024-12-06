import AppError from '@shared/errors/AppError';
import { ICreateOrder } from '../domain/models/ICreateOrder';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepositories';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepositories';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/models/IOrder';

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  async execute({ customer, products }: ICreateOrder): Promise<IOrder> {
    const customerExists = await this.customersRepository.findById(
      Number(customer),
    );

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.', 404);
    }

    const existsProducts = await this.productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError(
        'Could not find any products with the given ids.',
        404,
      );
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.product_id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].product_id}.`,
        404,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.product_id)[0].quantity <
        product.quantity,
    );

    if (!quantityAvailable.length) {
      throw new AppError(`The quantity is not available.`, 409);
    }

    const serializedProducts = products.map(product => ({
      product_id: product.product_id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.product_id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updateProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateStock(updateProductQuantity);

    return order;
  }
}

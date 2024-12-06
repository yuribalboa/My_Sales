import AppError from '@shared/errors/AppError';
import { IShowProduct } from '../domain/models/IShowProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

export default class ShowProductService {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}

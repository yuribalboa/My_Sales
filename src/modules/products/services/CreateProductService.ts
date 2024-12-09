import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateProductService {
  constructor(@inject('ProductsRepository') private readonly productsRepository: IProductsRepository) { }

  async execute({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-mysales-PRODUCT_LIST');

    return product;
  }
}

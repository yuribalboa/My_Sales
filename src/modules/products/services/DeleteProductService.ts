import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

export default class DeleteProductService {
  constructor(private readonly productsRepository: IProductsRepository) { }

  async execute({ id }: IDeleteProduct): Promise<void> {
    const redisCache = new RedisCache();
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await redisCache.invalidate('api-mysales-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}

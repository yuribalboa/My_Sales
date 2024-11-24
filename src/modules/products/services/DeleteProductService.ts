import AppError from '@shared/errors/AppError';
import { Product } from '../database/entities/Products';
import { productsRepositories } from '../database/repositories/ProductsRepositories';

interface IDeleteProduct {
  id: string;
}

export default class DeleteProductService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await productsRepositories.remove(product);
  }
}

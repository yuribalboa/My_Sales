import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductsControllers {
  async index(request: Request, response: Response) {
    const listProductsService = new ListProductService();
    const products = await listProductsService.execute();
    response.json(products);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const showProductService = new ShowProductService();
    const product = await showProductService.execute({ id });
    response.json(product);
  }

  async create(request: Request, response: Response) {
    const { name, price, quantity } = request.body;
    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });
    response.json(product);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const updateProductService = new UpdateProductService();
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });
    response.json(product);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute({ id });
    response.status(204).send([]);
  }
}

import productsRouter from "@modules/products/routes/ProductRoutes";
import { Router } from "express";
import { NextFunction, Request, Response } from 'express';

const routes = Router();

routes.get('/health', (_request: Request, response: Response, _next: NextFunction) => {
  response.json({ message: 'Hello Dev!' });
});

routes.use('/products', productsRouter);

export default routes;

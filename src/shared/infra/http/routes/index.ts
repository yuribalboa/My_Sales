import express, { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import avatarRouter from '@modules/users/infra/http/routes/AvatarRoutes';
import customersRouter from '@modules/customers/infra/http/routes/CustomersRoutes';
import ordersRouter from '@modules/orders/infra/http/routes/OrdersRoutes';
import passwordRouter from '@modules/users/infra/http/routes/PasswordRoutes';
import productsRouter from '@modules/products/infra/http/routes/ProductRoutes';
import profileRouter from '@modules/users/infra/http/routes/ProfileRoutes';
import sessionsRouter from '@modules/users/infra/http/routes/SessionRoutes';
import uploadConfig from '@config/upload';
import usersRouter from '@modules/users/infra/http/routes/UserRoutes';

const routes = Router();

routes.get(
  '/health',
  (_request: Request, response: Response, _next: NextFunction) => {
    response.json({ message: 'Hello Dev!' });
  },
);

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/avatar', avatarRouter);
routes.use('/files', express.static(uploadConfig.directory));
routes.use('/passwords', passwordRouter);
routes.use('/profiles', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;

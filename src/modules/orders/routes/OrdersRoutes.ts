import { Router } from 'express';
import OrdersController from '../controllers/OrdersControllers';
import AuthMiddleware from '@shared/middlewares/authMiddleware';
import { createOrderValidate, idParamsValidate } from '../schemas/OrderSchemas';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(AuthMiddleware.execute);

ordersRouter.get('/:id', idParamsValidate, ordersController.show);
ordersRouter.post('/', createOrderValidate, ordersController.create);

export default ordersRouter;

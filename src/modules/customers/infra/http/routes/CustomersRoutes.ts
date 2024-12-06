import { Router } from 'express';
import CustomersController from '../controllers/CustomersControllers';
import {
  createCustomerSchema,
  idParamsValidate,
  updateCustomerSchema,
} from '../schemas/CustomerSchema';

import AuthMiddleware from '@shared/middlewares/authMiddleware';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(AuthMiddleware.execute);
customersRouter.get('/', customersController.index);
customersRouter.get('/:id', idParamsValidate, customersController.show);
customersRouter.post('/', createCustomerSchema, customersController.create);
customersRouter.patch(
  '/:id',
  idParamsValidate,
  updateCustomerSchema,
  customersController.update,
);
customersRouter.delete('/:id', idParamsValidate, customersController.delete);

export default customersRouter;

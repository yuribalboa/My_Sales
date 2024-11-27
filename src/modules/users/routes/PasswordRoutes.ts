import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordControllers';

import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../schemas/PasswordSchemas';
import ResetPasswordController from '../controllers/ResetPasswordControllers';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  ForgotPasswordSchema,
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  ResetPasswordSchema,
  resetPasswordController.create,
);

export default passwordRouter;

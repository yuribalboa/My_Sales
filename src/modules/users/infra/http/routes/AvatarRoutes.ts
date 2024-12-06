import { Router } from 'express';
import AuthMiddleware from '@shared/middlewares/authMiddleware';
import UpdateAvatarControllers from '../controllers/UpdateAvatarControllers';
import multer from 'multer';
import uploadConfig from '@config/upload';

const avatarRouter = Router();
const userAvatarController = new UpdateAvatarControllers();
const upload = multer(uploadConfig);

avatarRouter.patch(
  '/',
  AuthMiddleware.execute,
  upload.single('avatar'),
  userAvatarController.update,
);

export default avatarRouter;

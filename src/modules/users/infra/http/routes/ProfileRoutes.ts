import { Router } from 'express';
import AuthMiddleware from '@shared/middlewares/authMiddleware';
import ProfileController from '../controllers/ProfileControllers';
import { updateProfileSchema } from '../schemas/UpdateUserSchema';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(AuthMiddleware.execute);
profileRouter.get('/', profileController.show);
profileRouter.patch('/', updateProfileSchema, profileController.update);

export default profileRouter;

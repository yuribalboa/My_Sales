import { Router } from 'express';
import SessionsController from '../controllers/SessionControllers';
import { sessionSchema } from '../schemas/SessionSchema';


const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionSchema, sessionsController.create);

export default sessionsRouter;

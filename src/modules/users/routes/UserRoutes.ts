import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const usersRouter = Router();
const usersController = new UsersControllers();

usersRouter.get('/', AuthMiddleware.execute, usersController.index);
usersRouter.get('/:id', usersController.show);
usersRouter.post('/', createUserSchema, usersController.create);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

export default usersRouter;

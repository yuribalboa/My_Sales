import SessionUserService from '@modules/users/services/SessionUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const createSession = container.resolve(SessionUserService);

    const userToken = await createSession.execute({
      email,
      password,
    });

    response.json(userToken);
  }
}

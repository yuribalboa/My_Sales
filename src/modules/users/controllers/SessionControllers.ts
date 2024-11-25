import { Request, Response } from 'express';
import SessionUserService from '../services/SessionUserService';

export default class SessionsController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const createSession = new SessionUserService();

    const userToken = await createSession.execute({
      email,
      password,
    });

    response.json(userToken);
  }
}

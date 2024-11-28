import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response) {

    const { password, token } = request.body;
    console.log(token);
    console.log(password);
    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      password,
      token,
    });

    response.status(204).json();
  }
}

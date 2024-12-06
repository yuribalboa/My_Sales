import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResetPasswordController {
  public async create(request: Request, response: Response) {

    const { password, token } = request.body;
    console.log(token);
    console.log(password);
    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      password,
      token,
    });

    response.status(204).json();
  }
}

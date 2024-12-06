import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { sendEmail } from '@config/email';
import { IForgotPassword } from '../domain/models/IForgotPassword';
import { IUsersRepository } from '../domain/repositories/IUserRepositories';
import { IUserTokensRepository } from '../domain/repositories/IUserTokenRepository';

export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepositories: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepositories: IUserTokensRepository,
  ) {}

  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await this.usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const token = await this.userTokensRepositories.generate(user.id);

    sendEmail({
      to: email,
      subject: 'My Sales Recovery Password',
      body: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; text-align: center; border: 2px solid #041d40; border-radius: 10px; margin: auto; width: 60%;">
          <h1 style="color: #041d40;">Password Reset Verification Code</h1>
          <h3 style="color: #041d40;">Dear ${user.name},</h3>
          <p style="font-size: 16px; color: #333;">Recover your password with this token:</p>
          <p>
            <strong style="border: 2px dashed #041d40; padding: 10px; border-radius: 5px; font-size: 16px; color: #041d40;">${token?.token}</strong>
          </p>
          <p style="margin-top: 20px;">Best regards,<br><span style="font-weight: bold; color: #041d40;">My Sales Staff</span></p>
        </div>
      `,
    })

    console.log(token);
  }
}

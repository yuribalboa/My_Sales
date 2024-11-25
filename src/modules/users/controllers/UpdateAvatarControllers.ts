import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UpdateAvatarControllers {
  public async update(request: Request, response: Response) {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      userId: Number(request.user.id),
      avatarFileName: request.file?.filename as string,
    });

    response.json(user);
  }
}

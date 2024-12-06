import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UpdateAvatarControllers {
  public async update(request: Request, response: Response) {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      userId: Number(request.user.id),
      avatarFileName: request.file?.filename as string,
    });

    response.json(user);
  }
}

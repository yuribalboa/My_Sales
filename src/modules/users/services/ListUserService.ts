import { IPaginateUser } from "../domain/models/IPaginateUser";
import { IUsersRepository } from "../domain/repositories/IUserRepositories";
import { SearchParams } from "../infra/database/repositories/UsersRepositories";

export default class ListUserService {
  constructor(private readonly usersRepositories: IUsersRepository) { }

  async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser>{
    const users = await this.usersRepositories.findAll({ page, skip, take });
    return users;
  }
}

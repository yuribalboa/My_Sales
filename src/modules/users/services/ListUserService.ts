import User from "../database/entities/Users";
import { usersRepositories } from "../database/repositories/UsersRepositories";

export default class ListUserService {
  async execute(): Promise<User[]>{
    const users = await usersRepositories.find();
    return users;
  }
}

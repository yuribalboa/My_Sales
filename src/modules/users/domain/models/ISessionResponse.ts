import User from "@modules/users/infra/database/entities/Users";

export interface ISessionResponse {
  user: User;
  token: string;
}

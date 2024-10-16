import { AppDataSource } from "../models/data-source";
import { User } from "../models/entity/user";

export class LoginService {

  async login(username: string, password: string): Promise<User | null> {
    const user = await AppDataSource.manager.findOneBy(User, {username: username, password: password});
    return user;
  }
}
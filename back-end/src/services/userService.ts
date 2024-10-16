import { AppDataSource } from "../models/data-source";
import { User } from "../models/entity/user";

export class UserService {
  async createUser(
    username: string,
    password: string,
    profile: string
  ): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    user.profile = profile;
    const newUser = await AppDataSource.manager.save(user);
    return newUser;
  }

  async getUser(): Promise<User[]> {
    const user = await AppDataSource.manager.find(User);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await AppDataSource.manager.findOne(User, {
        where: { username },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await AppDataSource.manager.findOne(User, {
        where: { id },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, updateData: Partial<User>) {
    try {
      const user = await this.getUserById(id);
      if (!user) {
        return undefined;
      }

      Object.assign(user, updateData);

      try {
        const updated = await AppDataSource.manager.save(user);
        console.log("User updated : ", updated);
        return updated;
      } catch (updatederror) {
        console.log("Error updating user : ", updatederror);
        throw updatederror;
      }
    } catch (error) {
      console.error("Error updating user : ", error);
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.getUserById(id);
      if (!user) {
        return false;
      }
      await AppDataSource.manager.delete(User, id);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

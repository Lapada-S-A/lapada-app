import type { User } from "~/interfaces/user";
import BaseService from "../base";

export default class UserService extends BaseService {
  async getById(id: number): Promise<User | undefined> {
    return await this.request(`auth/client/${id}`, "GET");
  }

  async add(user: User): Promise<User | undefined> {
    return await this.request("auth/register", "POST", user);
  }

  async update(user: User, userId: number): Promise<User | undefined> {
    return await this.request(`auth/user/update/${userId}`, "PUT", user);
  }

  async delete(userId: number): Promise<User | undefined> {
    return await this.request(`auth/delete/${userId}`, "DELETE");
  }

  async promoterToSeller(userId: number): Promise<User | undefined> {
    return await this.request(`auth/user/promote/${userId}`, "PATCH");
  }

  async updatePassword( password: string, userId: number,): Promise<User | undefined> {
    return await this.request(`auth/user/update/${userId}`, "PUT", { password });
  }
}

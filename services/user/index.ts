import type { User } from "~/interfaces/user";
import BaseService from "../base";

export default class UserService extends BaseService {
  private RESOURCE = "client/";
  
  async getById(id: number): Promise<User | undefined> {
    return await this.request(this.RESOURCE + `${id}`, "GET");
  }

  async add(user: User): Promise<User | undefined> {
    return await this.request(this.RESOURCE, "POST", user);
  }

  async update(user: User): Promise<User | undefined> {
    return await this.request(this.RESOURCE, "PUT", user);
  }
}

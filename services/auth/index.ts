import type { Auth } from "~/interfaces/auth";
import BaseService from "../base";

export default class AuthService extends BaseService {
  private RESOURCE: string = "login";

  async authenticate(data: object): Promise<Auth | undefined> {
    return await this.request(this.RESOURCE, "POST", data);
  }
}

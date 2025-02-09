import type { Type } from "~/interfaces/type";
import BaseService from "../base";

export default class TypeService extends BaseService {
  private RESOURCE: string = "type/";

  async getAll(): Promise<Type[] | undefined> {
    return await this.request(this.RESOURCE + "list", "GET");
  }
}

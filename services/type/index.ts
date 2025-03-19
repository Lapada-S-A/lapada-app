import type { Type, TypePaginatedResponse } from "~/interfaces/type";
import BaseService from "../base";

export default class TypeService extends BaseService {
  private RESOURCE: string = "type/";

  async getAll(): Promise<Type[] | undefined> {
    return await this.request(this.RESOURCE + "list", "GET");
  }

  async getPaginated(params: {
    [key: string]: string;
  }): Promise<TypePaginatedResponse | undefined> {
    const query = new URLSearchParams(params).toString();
    return await this.request(this.RESOURCE + "list?" + query, "GET");
  }

  async add(type: Type): Promise<Type | undefined> {
    return await this.request(this.RESOURCE + `create`, "POST", type);
  }

  async update(type: Type, id: number): Promise<Type | undefined> {
    return await this.request(this.RESOURCE + `update/${id}`, "PUT", type);
  }

  async delete(id: number): Promise<Type | undefined> {
    return await this.request(this.RESOURCE + `delete/${id}`, "DELETE");
  }
}

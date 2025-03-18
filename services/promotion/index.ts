import type { Promotion } from "~/interfaces/promotion";
import BaseService from "../base";

export default class PromotionService extends BaseService {
  private RESOURCE: string = "auth/user/promote/";

  async getAll(): Promise<Promotion[] | undefined> {
    return await this.request(this.RESOURCE, "GET");
  }

  async getByUserId(id: number): Promise<Promotion[] | undefined> {
    return await this.request(this.RESOURCE + id, "GET");
  }

  async add(
    buyerId: number,
    identityDocument: File
  ): Promise<Promotion | undefined> {
    const formData = new FormData();
    formData.append("identityDocument", identityDocument);
    return await this.request(this.RESOURCE + `${buyerId}`, "PATCH", formData);
  }

  async approve(id: number): Promise<Promotion | undefined> {
    return await this.request(this.RESOURCE + `approve/${id}`, "PATCH");
  }

  async reject(id: number): Promise<Promotion | undefined> {
    return await this.request(this.RESOURCE + `${id}`, "DELETE");
  }
}

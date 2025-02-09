import type { Category } from "~/interfaces/category";
import BaseService from "../base";

export default class CategoryService extends BaseService {
  private RESOURCE: string = "category/";

  async getAll(): Promise<Category[] | undefined> {
    return await this.request(this.RESOURCE + "list", "GET");
  }
}

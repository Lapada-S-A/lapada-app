import type {
  Category,
  CategoryPaginatedResponse,
} from "~/interfaces/category";
import BaseService from "../base";

export default class CategoryService extends BaseService {
  private RESOURCE: string = "category/";

  async getAll(): Promise<Category[] | undefined> {
    return await this.request(this.RESOURCE + "list", "GET");
  }

  async getPaginated(params: {
    [key: string]: string;
  }): Promise<CategoryPaginatedResponse | undefined> {
    const query = new URLSearchParams(params).toString();
    return await this.request(this.RESOURCE + "list?" + query, "GET");
  }

  async add(category: Category): Promise<Category | undefined> {
    return await this.request(this.RESOURCE + `create`, "POST", category);
  }

  async update(category: Category, id: number): Promise<Category | undefined> {
    return await this.request(this.RESOURCE + `update/${id}`, "PUT", category);
  }

  async delete(id: number): Promise<Category | undefined> {
    return await this.request(this.RESOURCE + `delete/${id}`, "DELETE");
  }
}

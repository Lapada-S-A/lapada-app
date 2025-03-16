import type { Submission } from "~/interfaces/submission";
import BaseService from "../base";

export default class SubmissionService extends BaseService {
  private RESOURCE: string = "curator/category/submissions/";

  async getAll(): Promise<Submission[] | undefined> {
    return await this.request(this.RESOURCE, "GET");
  }

  async add(
    curatorId: number,
    categoryId: number,
    receipt: File,
    identityDocument?: File
  ): Promise<Submission | undefined> {
    const formData = new FormData();
    formData.append("categoryId", categoryId.toString());
    formData.append("receipt", receipt);
    if (identityDocument) formData.append("identityDocument", identityDocument);
    return await this.request(
      this.RESOURCE + `assign/${curatorId}`,
      "POST",
      formData
    );
  }

  async approve(id: number): Promise<Submission | undefined> {
    return await this.request(this.RESOURCE + `approve/${id}`, "POST");
  }

  async reject(id: number): Promise<Submission | undefined> {
    return await this.request(this.RESOURCE + `delete/${id}`, "DELETE");
  }
}

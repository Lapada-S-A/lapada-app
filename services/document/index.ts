import type { Document } from "~/interfaces/document";
import BaseService from "../base";

export default class DocumentService extends BaseService {
  async send(document: File, userId: number): Promise<Document | undefined> {
    const formData = new FormData();
    formData.append("file", document);
    return await this.request(
      `documents/upload/${userId}`,
      "POST",
      formData
    );
  }
}

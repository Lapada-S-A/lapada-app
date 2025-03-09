import type { Chat, Message } from "~/interfaces/chat";
import BaseService from "../base";

export default class ChatService extends BaseService {
  private RESOURCE: string = "chat/";

  async getByUserId(id: number): Promise<Chat[] | undefined> {
    return await this.request(this.RESOURCE + `${id}`, "GET");
  }

  async add(ids: number[]): Promise<Chat | undefined> {
    return await this.request(this.RESOURCE + "create", "POST", { users: ids });
  }

  async sendMessage(message: Message): Promise<Message | undefined> {
    return await this.request(this.RESOURCE + "message", "POST", message);
  }

  async getMessages(id: number): Promise<Message[] | undefined> {
    return await this.request(this.RESOURCE + `${id}/messages`, "GET");
  }
}

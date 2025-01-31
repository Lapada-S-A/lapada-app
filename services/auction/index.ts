import type { Auction, AuctionPaginatedResponse } from "~/interfaces/auction";
import BaseService from "../base";

export default class AuctionService extends BaseService {
  private RESOURCE: string = "auction/";

  async getPaginated(params: {
    [key: string]: string;
  }): Promise<AuctionPaginatedResponse | undefined> {
    const query = new URLSearchParams(params).toString();
    return await this.request(this.RESOURCE + "list?" + query, "GET");
  }

  async getAll(): Promise<Auction[] | undefined> {
    return await this.request(this.RESOURCE + "list", "GET");
  }
}

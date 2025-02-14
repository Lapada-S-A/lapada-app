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

  async getById(id: number): Promise<Auction | undefined> {
    return await this.request(this.RESOURCE + `list/${id}`, "GET");
  }

  async add(auction: Auction): Promise<Auction | undefined> {
    return await this.request(this.RESOURCE + "create", "POST", auction);
  }

  async update(auction: Auction, id: number): Promise<Auction | undefined> {
    return await this.request(this.RESOURCE + `update/${id}`, "PUT", auction);
  }

  async changeStatusOfAction(id: number, status:string): Promise<Auction | undefined> {
    return await this.request(this.RESOURCE + `${status}/${id}`, "POST");
  }

  async getAuctionsBySeller(sellerId: number): Promise<Auction[] | undefined> {
    return await this.request(this.RESOURCE + `seller/${sellerId}`, "GET");
  }
}

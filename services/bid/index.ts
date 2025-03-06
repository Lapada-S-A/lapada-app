import type { Bid, BidsPaginatedResponse, UserBid } from "~/interfaces/bid";
import BaseService from "../base";

export default class BidService extends BaseService {
  private RESOURCE: string = "bid/";

  async getByAuctionId(auctionId: number): Promise<Bid[] | undefined> {
    return await this.request(this.RESOURCE + `list/${auctionId}`, "GET");
  }

  async createBid(bid: UserBid): Promise<Bid | undefined> {
    return await this.request(this.RESOURCE + "create", "POST", bid);
  }

  async getByAuctionByBuyer(auctionId: number, buyerId: number): Promise<BidsPaginatedResponse | undefined> {
    return await this.request(this.RESOURCE + `list/auction/${auctionId}/buyer/${buyerId}`, "GET");
  }
}

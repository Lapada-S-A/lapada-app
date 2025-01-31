import type { Bid } from "~/interfaces/bid";
import BaseService from "../base";

export default class BidService extends BaseService {
  private RESOURCE: string = "bid/";

  async getByAuctionId(auctionId: number): Promise<Bid[] | undefined> {
    return await this.request(this.RESOURCE + `list/${auctionId}`, "GET");
  }
}

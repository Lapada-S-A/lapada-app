import type {
  Auction,
  AuctionByBuyerPaginatedResponse,
  AuctionByIdResponse,
  AuctionPaginatedResponse,
} from "~/interfaces/auction";
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

  async getById(id: number): Promise<AuctionByIdResponse | undefined> {
    return await this.request(this.RESOURCE + `list/${id}`, "GET");
  }

  async add(auction: Auction): Promise<Auction | undefined> {
    const formData = new FormData();
    Object.entries(auction).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return await this.request(this.RESOURCE + `create`, "POST", formData);
  }

  async update(auction: Auction, id: number): Promise<Auction | undefined> {
    const formData = new FormData();
    Object.entries(auction).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return await this.request(this.RESOURCE + `update/${id}`, "PUT", formData);
  }

  async changeStatusOfAction(
    id: number,
    status: string
  ): Promise<Auction | undefined> {
    return await this.request(this.RESOURCE + `${status}/${id}`, "POST");
  }

  async getAuctionsBySeller(sellerId: number): Promise<Auction[] | undefined> {
    return await this.request(this.RESOURCE + `seller/${sellerId}`, "GET");
  }

  async getAuctionsByBuyer(
    buyerId: number,
    params: {
      [key: string]: string;
    }
  ): Promise<AuctionByBuyerPaginatedResponse | undefined> {
    const query = new URLSearchParams(params).toString();
    return await this.request(
      this.RESOURCE + `buyer/${buyerId}?` + query,
      "GET"
    );
  }

  async getPendingAuctionsByCategories(
    params: {
      [key: string]: string;
    },
    categories_ids: number[]
  ): Promise<AuctionPaginatedResponse | undefined> {
    const query = new URLSearchParams(params).toString();
    return await this.request(
      this.RESOURCE + "list_by_categories?" + query,
      "POST",
      { categories_ids: categories_ids }
    );
  }

  async finish(auctionId: number): Promise<Auction | undefined> {
    return await this.request(this.RESOURCE + `finish/${auctionId}`, "PATCH");
  }

  async cancel(auctionId: number): Promise<Auction | undefined> {
    return await this.request(this.RESOURCE + `cancel/${auctionId}`, "PATCH");
  }

  async approve(auctionId: number): Promise<Auction | undefined> {
    return await this.request(this.RESOURCE + `approve/${auctionId}`, "POST");
  }

  async reject(auctionId: number): Promise<Auction | undefined> {
    return await this.request(this.RESOURCE + `reject/${auctionId}`, "POST");
  }
}

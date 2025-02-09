import type AuctionService from "~/services/auction";
import type BidService from "~/services/bid";
import type CategoryService from "~/services/category";

export interface ApiInstance {
  auction: AuctionService;
  bid: BidService;
  category: CategoryService;
}

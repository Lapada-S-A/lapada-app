import type AuctionService from "~/services/auction";
import type BidService from "~/services/bid";

export interface ApiInstance {
  auction: AuctionService;
  bid: BidService;
}

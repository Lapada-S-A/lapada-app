import type { BidStatus } from "~/stores/enum";

export interface Bid {
  id: number;
  amount: number;
  auction_id: number;
  bid_date: string;
  bid_status: BidStatus;
  buyer_id: number;
}

export interface BidsPaginatedResponse {
  bids: Bid[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

export interface UserBid {
  amount: number;
  auction_id: number;
  buyer_id: number;
}

import type { AuctionStatus } from "~/stores/enum";

export interface Auction {
  id: number;
  title: string;
  type_id: number;
  created_date: string;
  end_date: string;
  initial_value: number;
  highest_bid: number;
  item_id: number;
  min_increment: number;
  seller_id: number;
  status: AuctionStatus;
}

export interface AuctionPaginatedResponse {
  items: Auction[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
  };
}

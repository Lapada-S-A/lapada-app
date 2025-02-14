import type { AuctionStatus } from "~/stores/enum";

export interface Auction {
  id?: number;
  title: string;
  description: string;
  categories: number[];
  type_id: number;
  created_date?: string;
  end_date: string;
  initial_value: number;
  highest_bid?: number;
  min_increment: number;
  seller_id: number;
  status: AuctionStatus;
}

export interface AuctionSpecification {
  title: string | null;
  initial_value: number | null;
  min_increment: number | null;
  end_date: string | null;
  categories: number[] | null;
  type_id: number | null;
  description: string | null;
}

export interface AuctionPaginatedResponse {
  items: Auction[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
  };
}

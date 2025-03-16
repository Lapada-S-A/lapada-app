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
  photo1?: File;
  photo2?: File;
  photo3?: File;
  photo4?: File;
}

export interface AuctionResponse {
  auction: Auction;
  document: AuctionPhotosResponse;
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

export interface AuctionPhotos {
  photo1: File | null;
  photo2?: File | null;
  photo3?: File | null;
  photo4?: File | null;
}

export interface AuctionPaginatedResponse {
  items: AuctionResponse[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
  };
}
export interface AuctionByBuyerPaginatedResponse {
  items: AuctionResponse[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

export interface AuctionByIdResponse {
  auction: Auction;
  documents: AuctionPhotosResponse[];
}

export interface AuctionPhotosResponse {
  pdfData: { data: Buffer };
}

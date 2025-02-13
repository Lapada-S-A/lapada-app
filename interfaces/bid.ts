export interface Bid {
  id: number;
  amount: number;
  auction_id: number;
  bid_date: string;
  bid_status_id: number;
  buyer_id: number;
}

export interface UserBid{
  amount: number;
  auction_id: number;
  buyer_id: number;
}

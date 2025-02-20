export enum UserTypes {
  Buyer = 1,
  Seller = 2,
  Curator = 3,
  Administrator = 4,
}

export enum AuctionStatus {
  PENDING = 1,
  OPEN = 2,
  FINISHED = 3,
  REJECTED = 4,
  CANCELED = 5,
}

export enum BidStatus {
  ACTIVE = 1,
  EXPIRED = 2,
  WINNER = 3,
  CANCELED = 4,
}

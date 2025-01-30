export type FilterData = {
    category: string | null;
    auctionType: string | null;
    status: string | null;
    minBid: number | null;
    maxBid: number | null;
    endDate: string | Date |  null;
  };
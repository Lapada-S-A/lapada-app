import type { Bid, BidsPaginatedResponse, UserBid } from "~/interfaces/bid";

export const useBidsStore = defineStore("bids", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);

  const getBidsByAuctionId = async (
    auctionId: number
  ): Promise<Bid[] | undefined> => {
    loading.value = true;
    try {
      const response = await $api.bid.getByAuctionId(auctionId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const createBid = async (bid: UserBid): Promise<Bid | undefined> => {
    loading.value = true;
    try {
      const response = await $api.bid.createBid(bid);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const getBidsByAuctionIdByBuyerId = async (
    auctionId: number,
    buyerId: number
  ): Promise<BidsPaginatedResponse | undefined> => {
    loading.value = true;
    try {
      const response = await $api.bid.getByAuctionByBuyer(auctionId, buyerId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getBidsByAuctionId,
    createBid,
    getBidsByAuctionIdByBuyerId,
  };
});

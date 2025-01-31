import type { Bid } from "~/interfaces/bid";

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

  return {
    loading,
    getBidsByAuctionId,
  };
});

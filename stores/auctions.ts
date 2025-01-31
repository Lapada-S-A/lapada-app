import type { AuctionPaginatedResponse } from "~/interfaces/auction";

export const useAuctionsStore = defineStore("auctions", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);

  const getAuctionsPaginated = async (params: {
    [key: string]: string;
  }): Promise<AuctionPaginatedResponse | undefined> => {
    loading.value = true;
    try {
      const response = await $api.auction.getPaginated(params);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getAuctionsPaginated,
  };
});

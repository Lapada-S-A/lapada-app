import type { Auction, AuctionPaginatedResponse } from "~/interfaces/auction";

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

  const getAllAuctions = async (): Promise<Auction[] | undefined> => {
    loading.value = true;
    try {
      const response = await $api.auction.getAll();
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const getAuctionById = async (
    auctionId: number
  ): Promise<Auction | undefined> => {
    loading.value = true;
    try {
      const response = await $api.auction.getById(auctionId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const addAuction = async (auction: Auction): Promise<Auction | undefined> => {
    loading.value = true;
    try {
      const response = await $api.auction.add(auction);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const updateAuction = async (
    auction: Auction
  ): Promise<Auction | undefined> => {
    loading.value = true;
    const { id: auctionId, ...auctionData } = auction;
    try {
      const response = await $api.auction.update(auctionData, auctionId!);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getAuctionsPaginated,
    getAllAuctions,
    getAuctionById,
    addAuction,
    updateAuction,
  };
});

import type {
  Auction,
  AuctionByBuyerPaginatedResponse,
  AuctionPaginatedResponse,
} from "~/interfaces/auction";

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

  const changeStatusOfAuction = async (
    auctionId: number,
    status: string
  ): Promise<Auction | undefined> => {
    loading.value = true;
    try {
      return await $api.auction.changeStatusOfAction(auctionId, status);
    } finally {
      loading.value = false;
    }
  };

  const getAuctionsBySeller = async (
    sellerId: number
  ): Promise<Auction[] | undefined> => {
    loading.value = true;
    try {
      return await $api.auction.getAuctionsBySeller(sellerId);
    } finally {
      loading.value = false;
    }
  };

  const getAuctionsByBuyer = async (
    buyerId: number,
    params: {
      [key: string]: string;
    }
  ): Promise<AuctionByBuyerPaginatedResponse | undefined> => {
    loading.value = true;
    try {
      return await $api.auction.getAuctionsByBuyer(buyerId, params);
    } finally {
      loading.value = false;
    }
  };

  const finishAuction = async (
    auctionId: number
  ): Promise<Auction | undefined> => {
    loading.value = true;
    try {
      const response = await $api.auction.finish(auctionId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const cancelAuction = async (
    auctionId: number
  ): Promise<Auction | undefined> => {
    loading.value = true;
    try {
      const response = await $api.auction.cancel(auctionId);
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
    changeStatusOfAuction,
    getAuctionsBySeller,
    getAuctionsByBuyer,
    finishAuction,
    cancelAuction
  };
});

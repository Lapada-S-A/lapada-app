import { $fetch, type FetchOptions } from "ofetch";
import type { ApiInstance } from "~/interfaces/api-instance";
import AuctionService from "~/services/auction";
import BidService from "~/services/bid";

export default defineNuxtPlugin(() => {
  const fetchOptions: FetchOptions = {
    baseURL: "http://localhost:5000/",
  };

  const apiFecther = $fetch.create(fetchOptions);

  const services: ApiInstance = {
    auction: new AuctionService(apiFecther),
    bid: new BidService(apiFecther),
  };

  return {
    provide: {
      api: services,
    },
  };
});

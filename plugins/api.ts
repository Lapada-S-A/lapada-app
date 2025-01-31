import { $fetch, type FetchOptions } from "ofetch";
import type { ApiInstance } from "~/interfaces/api-instance";
import AuctionService from "~/services/auction";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { $i18n, $router } = useNuxtApp();

  const fetchOptions: FetchOptions = {
    baseURL: "http://localhost:5000/",
  };

  const apiFecther = $fetch.create(fetchOptions);

  const services: ApiInstance = {
    auction: new AuctionService(apiFecther),
  };

  return {
    provide: {
      api: services,
    },
  };
});

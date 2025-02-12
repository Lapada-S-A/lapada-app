import { $fetch, type FetchOptions } from "ofetch";
import type { ApiInstance } from "~/interfaces/api-instance";
import AuctionService from "~/services/auction";
import AuthService from "~/services/auth";
import BidService from "~/services/bid";
import CategoryService from "~/services/category";
import TypeService from "~/services/type";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const fetchOptions: FetchOptions = {
    onRequest({ options }) {
      let url = config.public.apiBaseUrl;

      if (router.currentRoute.value.path === "/login") {
        url = config.public.authBaseUrl;
      }

      options.baseURL = url;
    },
  };

  const apiFetcher = $fetch.create(fetchOptions);

  const services: ApiInstance = {
    auction: new AuctionService(apiFetcher),
    auth: new AuthService(apiFetcher),
    bid: new BidService(apiFetcher),
    category: new CategoryService(apiFetcher),
    type: new TypeService(apiFetcher),
  };

  return {
    provide: {
      api: services,
    },
  };
});

import { $fetch, type FetchOptions } from "ofetch";
import type { ApiInstance } from "~/interfaces/api-instance";
import AuctionService from "~/services/auction";
import AuthService from "~/services/auth";
import BidService from "~/services/bid";
import CategoryService from "~/services/category";
import ChatService from "~/services/chat";
import DocumentService from "~/services/document";
import ReviewService from "~/services/review";
import SubmissionService from "~/services/submission";
import TypeService from "~/services/type";
import UserService from "~/services/user";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    onRequest({ options, request }) {
      let url = config.public.apiBaseUrl;

      const requestStr = request.toString();
      if (
        requestStr.includes("auth") ||
        requestStr.includes("client") ||
        requestStr.includes("documents") ||
        requestStr.includes("curator")
      ) {
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
    chat: new ChatService(apiFetcher),
    document: new DocumentService(apiFetcher),
    review: new ReviewService(apiFetcher),
    submission: new SubmissionService(apiFetcher),
    type: new TypeService(apiFetcher),
    user: new UserService(apiFetcher),
  };

  return {
    provide: {
      api: services,
    },
  };
});

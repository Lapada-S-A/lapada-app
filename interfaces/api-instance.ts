import type AuctionService from "~/services/auction";
import type AuthService from "~/services/auth";
import type BidService from "~/services/bid";
import type CategoryService from "~/services/category";
import type DocumentService from "~/services/document";
import type TypeService from "~/services/type";
import type UserService from "~/services/user";

export interface ApiInstance {
  auction: AuctionService;
  auth: AuthService;
  bid: BidService;
  category: CategoryService;
  document: DocumentService;
  type: TypeService;
  user: UserService;
}

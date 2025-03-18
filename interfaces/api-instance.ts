import type AuctionService from "~/services/auction";
import type AuthService from "~/services/auth";
import type BidService from "~/services/bid";
import type CategoryService from "~/services/category";
import type ChatService from "~/services/chat";
import type DocumentService from "~/services/document";
import type PromotionService from "~/services/promotion";
import type ReviewService from "~/services/review";
import type SubmissionService from "~/services/submission";
import type TypeService from "~/services/type";
import type UserService from "~/services/user";

export interface ApiInstance {
  auction: AuctionService;
  auth: AuthService;
  bid: BidService;
  category: CategoryService;
  chat: ChatService;
  document: DocumentService;
  promotion: PromotionService;
  review: ReviewService;
  submission: SubmissionService;
  type: TypeService;
  user: UserService;
}

import type { AverageRating, Review, ReviewRequest } from "~/interfaces/review";
import BaseService from "../base";

export default class ReviewService extends BaseService {
  private RESOURCE: string = "review/";

  async createReview(review: ReviewRequest): Promise<Review | undefined> {
    return await this.request(this.RESOURCE + "create", "POST", review);
  }

  async getAverageRatingOfSeller(sellerId: number): Promise<AverageRating | undefined> {
    return await this.request(this.RESOURCE + `list/seller/${sellerId}/rating`, "GET");
  }

  async getReviewsOfSeller(sellerId: number): Promise<Review[] | undefined> {
    return await this.request(this.RESOURCE + `list/seller/${sellerId}`, "GET");
  }

  async getReviewsOfBuyer(buyerId: number): Promise<Review[] | undefined> {
    return await this.request(this.RESOURCE + `list/buyer/${buyerId}`, "GET");
  }

  async getAllReviews(): Promise<Review[] | undefined> {
    return await this.request(this.RESOURCE + `list`, "GET");
  }

  async deleteReview(reviewId: number): Promise<Review | undefined> {
    return await this.request(this.RESOURCE + `delete/${reviewId}`, "DELETE");
  }

  async updateReview(review: Review): Promise<Review | undefined> {
    return await this.request(this.RESOURCE + `update/${review.id}`, "PUT", review);
  }

}

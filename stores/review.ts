import type { AverageRating, Review, ReviewRequest } from "~/interfaces/review";

export const useReviewStore = defineStore("review", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);

  const createReview = async (review: ReviewRequest): Promise<Review | undefined> => {
    loading.value = true;
    try {
      const response = await $api.review.createReview(review);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const getAverageRatingOfSeller = async (sellerId: number): Promise<AverageRating | undefined> => {
    loading.value = true;
    try {
      const response = await $api.review.getAverageRatingOfSeller(sellerId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const getReviewsOfSeller = async (sellerId: number): Promise<Review[] | undefined> => {
    loading.value = true;
    try {
      const response = await $api.review.getReviewsOfSeller(sellerId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const getReviewsOfBuyer = async (buyerId: number): Promise<Review[] | undefined> => {
    loading.value = true;
    try {
      const response = await $api.review.getReviewsOfBuyer(buyerId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const getAllReviews = async (): Promise<Review[] | undefined> => {
    loading.value = true;
    try {
      const response = await $api.review.getAllReviews();
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const deleteReview = async (reviewId: number): Promise<Review | undefined> => {
    loading.value = true;
    try {
      const response = await $api.review.deleteReview(reviewId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const updateReview = async (review: Review): Promise<Review | undefined> => {
    loading.value = true;
    try {
      const response = await $api.review.updateReview(review);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    createReview,
    getAverageRatingOfSeller,
    getReviewsOfSeller,
    getReviewsOfBuyer,
    getAllReviews,
    deleteReview,
    updateReview,
  };
});

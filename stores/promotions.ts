import type { Promotion } from "~/interfaces/promotion";

export const usePromotionsStore = defineStore("promotions", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);
  const promotions = ref<Promotion[]>([]);

  const getAllPromotions = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await $api.promotion.getAll();
      if (response) promotions.value = response;
    } finally {
      loading.value = false;
    }
  };

  const getUserPromotion = async (id: number): Promise<Promotion[] | undefined> => {
    loading.value = true;
    try {
      const response = await $api.promotion.getByUserId(id);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const addPromotion = async (
    buyerId: number,
    identityDocument: File
  ): Promise<Promotion | undefined> => {
    loading.value = true;
    try {
      const response = await $api.promotion.add(buyerId, identityDocument);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const approvePromotion = async (
    promotionId: number
  ): Promise<Promotion | undefined> => {
    loading.value = true;
    try {
      const response = await $api.promotion.approve(promotionId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const rejectPromotion = async (
    promotionId: number
  ): Promise<Promotion | undefined> => {
    loading.value = true;
    try {
      const response = await $api.promotion.reject(promotionId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    promotions,
    getAllPromotions,
    getUserPromotion,
    addPromotion,
    approvePromotion,
    rejectPromotion,
  };
});

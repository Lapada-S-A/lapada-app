import type { Category } from "~/interfaces/category";

export const useCategoriesStore = defineStore("categories", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);

  const getAllCategories = async (): Promise<Category[] | undefined> => {
    loading.value = true;
    try {
      const response = await $api.category.getAll();
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getAllCategories,
  };
});

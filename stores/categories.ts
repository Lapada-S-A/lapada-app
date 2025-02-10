import type { Category } from "~/interfaces/category";

export const useCategoriesStore = defineStore("categories", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);
  const categories = ref<Category[]>([]);

  const getAllCategories = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await $api.category.getAll();
      if (response) categories.value = response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    categories,
    getAllCategories,
  };
});

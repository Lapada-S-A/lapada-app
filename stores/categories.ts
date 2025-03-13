import type {
  Category,
  CategoryPaginatedResponse,
} from "~/interfaces/category";

export const useCategoriesStore = defineStore("categories", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);
  const categories = ref<Category[]>([]);

  const getCategoriesPaginated = async (params: {
    [key: string]: string;
  }): Promise<CategoryPaginatedResponse | undefined> => {
    loading.value = true;
    try {
      const response = await $api.category.getPaginated(params);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const getAllCategories = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await $api.category.getAll();
      if (response) categories.value = response;
    } finally {
      loading.value = false;
    }
  };

  const addCategory = async (
    category: Category
  ): Promise<Category | undefined> => {
    loading.value = true;
    try {
      const response = await $api.category.add(category);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const updateCategory = async (
    category: Category
  ): Promise<Category | undefined> => {
    const { id, ...categoryWithoutId } = category;
    loading.value = true;
    try {
      const response = await $api.category.update(categoryWithoutId, id!);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const deleteCategory = async (
    categoryId: number
  ): Promise<Category | undefined> => {
    loading.value = true;
    try {
      const response = await $api.category.delete(categoryId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    categories,
    getCategoriesPaginated,
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
});

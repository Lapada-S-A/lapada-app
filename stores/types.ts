import type { Type } from "~/interfaces/type";

export const useTypesStore = defineStore("types", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);

  const getAllTypes = async (): Promise<Type[] | undefined> => {
    loading.value = true;
    try {
      const response = await $api.type.getAll();
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getAllTypes,
  };
});

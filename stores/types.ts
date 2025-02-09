import type { Type } from "~/interfaces/type";

export const useTypesStore = defineStore("types", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);
  const types = ref<Type[]>([]);

  const getAllTypes = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await $api.type.getAll();
      if (response) types.value = response;
    } finally {
      loading.value = false;
    }
  };

  const getTypeById = (typeId: number): Type | undefined => {
    loading.value = true;
    const type = types.value.find((t) => t.id === typeId);
    loading.value = false;
    return type;
  };

  return {
    loading,
    types,
    getAllTypes,
    getTypeById,
  };
});

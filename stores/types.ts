import type { Type, TypePaginatedResponse } from "~/interfaces/type";

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

  const getTypesPaginated = async (params: {
    [key: string]: string;
  }): Promise<TypePaginatedResponse | undefined> => {
    loading.value = true;
    try {
      const response = await $api.type.getPaginated(params);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const addType = async (type: Type): Promise<Type | undefined> => {
    loading.value = true;
    try {
      const response = await $api.type.add(type);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const updateType = async (type: Type): Promise<Type | undefined> => {
    const { id, ...typeWithoutId } = type;
    loading.value = true;
    try {
      const response = await $api.type.update(typeWithoutId, id!);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const deleteType = async (typeId: number): Promise<Type | undefined> => {
    loading.value = true;
    try {
      const response = await $api.type.delete(typeId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    types,
    getAllTypes,
    getTypeById,
    getTypesPaginated,
    addType,
    updateType,
    deleteType,
  };
});

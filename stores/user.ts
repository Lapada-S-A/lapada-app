import type { User } from "~/interfaces/user";

export const useUserStore = defineStore(
  "lapada_user",
  () => {
    const { $api } = useNuxtApp();
    const loading = ref<boolean>(false);
    const currentUser = ref<User | null>();

    const getUserById = async (userId: number): Promise<void> => {
      loading.value = true;
      try {
        const response = await $api.user.getById(userId);
        if (response) currentUser.value = response;
      } finally {
        loading.value = false;
      }
    };

    return {
      currentUser,
      getUserById,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);

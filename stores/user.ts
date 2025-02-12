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

    const registerUser = async (user: User): Promise<User | undefined> => {
      loading.value = true;
      try { 
        const response = await $api.user.add(user);
        if (response) return response;
      } finally {
        loading.value = false;
      }
    };

    return {
      currentUser,
      getUserById,
      registerUser,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);

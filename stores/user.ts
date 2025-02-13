import type { User } from "~/interfaces/user";

export const useUserStore = defineStore(
  "lapada_user",
  () => {
    const { $api } = useNuxtApp();
    const routesStore = useRoutesStore();
    const loading = ref<boolean>(false);
    const currentUser = ref<User | null>();

    const getUserById = async (userId: number): Promise<void> => {
      loading.value = true;
      try {
        const response = await $api.user.getById(userId);
        if (response) {
          currentUser.value = response;
          routesStore.userType = currentUser.value.type_user;
        }
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

<<<<<<< Updated upstream
=======
    const updateUser = async (user: User): Promise<void> => {
      loading.value = true;
      const { id: userId, ...userData } = user;
      try {
        const response = await $api.user.update(userData, userId!);
        if (response) {
          await getUserById(currentUser.value!.id!);
        }
      } finally {
        loading.value = false;
      }
    };

    const getClientById = async (
      clientId: number
    ): Promise<User | undefined> => {
      loading.value = true;
      try {
        const response = await $api.user.getById(clientId);
        if (response) return response;
      } finally {
        loading.value = false;
      }
    };

>>>>>>> Stashed changes
    return {
      currentUser,
      getUserById,
      registerUser,
<<<<<<< Updated upstream
=======
      updateUser,
      getClientById,
>>>>>>> Stashed changes
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);

import type { User } from "~/interfaces/user";

export const useUserStore = defineStore(
  "lapada_user",
  () => {
    const { $api } = useNuxtApp();
    const routesStore = useRoutesStore();
    const authStore = useAuthStore();
    const loading = ref<boolean>(false);
    const currentUser = ref<User | null>();
    const router = useRouter();

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

    const deleteAccount = async (userId: number): Promise<void> => {
      loading.value = true;
      try {
        await $api.user.delete(userId);
        authStore.disauthenticate();
        router.push("/login");
      } finally {
        loading.value = false;
      }
    }

    const promoterToSeller = async (userId: number): Promise<void> => {
      loading.value = true;
      try {
        await $api.user.promoterToSeller(userId);
        await getUserById(userId);
      } finally {
        loading.value = false;
      }
    }

    const updateUserPassword = async ( newPassword: string, userId:number): Promise<void> => {
      loading.value = true;
      try {
        await $api.user.updatePassword(newPassword, userId);
      } finally {
        loading.value = false;
      }
    }

    return {
      currentUser,
      getUserById,
      registerUser,
      updateUser,
      getClientById,
      deleteAccount,
      promoterToSeller,
      updateUserPassword
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);

import type { User } from "~/interfaces/user";

export const useUserStore = defineStore(
  "lapada_user",
  () => {
    // const { $api } = useNuxtApp();
    const currentUser = ref<User | null>();
    const currentUserId = ref<number | null>();

    return {
      currentUser,
      currentUserId
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);

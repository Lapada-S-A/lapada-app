<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset="-15, -15">
    <template #activator="{ props }">
      <v-btn
        id="menu-btn"
        v-bind="props"
        class="rounded-circle bg-secondary mr-6"
        icon
        flat
        width="35"
        height="35"
      >
      <CommonUserInitials :username="userStore.currentUser?.username!" :size="35" :font-size="14"/>
      </v-btn>
    </template>

    <v-card class="pt-4" width="300px">
      <v-list class="pl-2 pr-8 py-0">
        <v-list-item class="py-0">
          <template #prepend>
            <v-icon size="30" color="primary"> mdi-account-circle </v-icon>
          </template>

          <div class="d-flex flex-column">
            <span class="font-weight-bold font-large text-truncate mb-n1">
              {{ userStore.currentUser ? userStore.currentUser.username : "" }}
            </span>
            <span class="font-small text-font-60 text-truncate">
              {{ userStore.currentUser ? userStore.currentUser.email : "" }}
            </span>
          </div>
        </v-list-item>
      </v-list>

      <v-divider class="mt-3" />

      <v-list class="pb-3">
        <v-list-item
          v-for="item of menuItems"
          :id="item.buttonId"
          :key="item.title"
          class="px-6"
          variant="plain"
          :ripple="false"
          @click="item.click"
        >
          <template #prepend>
            <v-icon size="28" color="primary">
              {{ item.icon }}
            </v-icon>
          </template>
          <span class="font-weight-semibold">{{ item.title }}</span>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const menu = ref(false);
const menuItems = ref([
  {
    title: "Meu perfil",
    icon: "mdi-account",
    click: () => router.push("/profile"),
    buttonId: "profile-btn",
  },
  {
    title: "Sair",
    icon: "mdi-logout-variant",
    click: () => logout(),
    buttonId: "logout-btn",
  },
]);

function logout() {
  authStore.disauthenticate();
  router.push("/login");
}
</script>

<style scoped>
:deep(.v-list-item__spacer) {
  width: 20px !important;
}

:deep(.v-list-item__prepend i, .v-list-item__content span) {
  opacity: 1 !important;
}

:deep(.v-list-item--variant-plain) {
  opacity: 1 !important;

  &:hover {
    opacity: 0.8 !important;
  }
}
</style>

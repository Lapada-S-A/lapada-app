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
        <div class="font-normal">MK</div>
      </v-btn>
    </template>

    <v-card class="pt-3" max-width="250px" elevation="1">
      <v-list class="pl-2 pr-8 py-0">
        <v-list-item class="py-0">
          <template #prepend>
            <v-icon size="30" color="primary"> mdi-account-circle </v-icon>
          </template>

          <div class="d-flex flex-column">
            <span class="font-weight-bold text-truncate negative-spacing">
              Marcela Kramer
            </span>
            <span class="font-smaller text-font-60 text-truncate">
              marcelakramer@gmail.com
            </span>
          </div>
        </v-list-item>
      </v-list>

      <v-divider class="mt-3" />

      <v-list class="pb-2">
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
          <span class="font-normal font-weight-semibold">{{ item.title }}</span>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
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
    click: () => router.push("/login"),
    buttonId: "logout-btn",
  },
]);
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

.negative-spacing {
  margin-bottom: -4px;
}
</style>

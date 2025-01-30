<template>
  <v-navigation-drawer permanent expand-on-hover rail class="bg-primary">
    <v-list>
      <v-list-item>
        <template #prepend>
          <v-icon class="text-font-primary">mdi-menu</v-icon>
        </template>
        <template #title>
          <v-img
            id="title-btn"
            src="~/assets/images/title-white.svg"
            max-width="120"
            class="cursor-pointer"
            @click="$router.push('/')"
          />
        </template>
      </v-list-item>
    </v-list>

    <v-list>
      <v-list-item
        v-for="(route, index) in routesStore.menuRoutes"
        :id="`${route.to.split('/')[1]}-btn`"
        :key="index"
        :active="isOptionActive(route.to)"
        variant="text"
        @click="$router.push(route.to)"
      >
        <template #prepend>
          <div v-if="isOptionActive(route.to)" class="active-indicator" />
          <v-icon>{{
            isOptionActive(route.to) ? route.icon : `${route.icon}-outline`
          }}</v-icon>
        </template>
        <template #title>
          <div class="font-normal">{{ route.label }}</div>
        </template>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="d-flex justify-center mb-4">
        <v-img src="~/assets/images/logo-white.svg" max-width="24" />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const router = useRouter();
const routesStore = useRoutesStore();

function isOptionActive(route: string): boolean {
  return router.currentRoute.value.path === route;
}
</script>

<style scoped>
:deep(.v-list-item__prepend > .v-icon) {
  opacity: 1;
}

:deep(.v-list-item--variant-text .v-list-item__overlay) {
  background: none;
}

:deep(.v-list-item--active .v-list-item-title) {
  font-weight: bold !important;
}

.active-indicator {
  width: 4px;
  height: 40px;
  background-color: rgba(var(--v-theme-font-10));
  margin-right: 10px;
  margin-left: -16px;
}
</style>

<template>
  <v-app-bar
    class="pl-8 bg-primary-60 font-subtitle font-weight-bold"
    elevation="0"
  >
    {{ currentRoute.label }}
    <template #append>
      <div class="d-flex align-center ml-9">
        <LayoutsDefaultProfileMenu />
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
const route = useRoute();
const routesStore = useRoutesStore();
const currentRoute = computed(() => {
  return routesStore.findCurrentRoute(route.path);
});
</script>

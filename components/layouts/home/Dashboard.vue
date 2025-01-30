<template>
      <div class="d-flex flex-wrap justify-center align-start gap-4">
        <LayoutsDefaultButtonWithAction
          v-for="action in routeStore.menuRoutes"
          :key="action.label"
          :label="action.label"
          :icon="action.icon"
          :onClick="() => navigateTo(action.route)"
        />
      </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from "vue-router";
  const router = useRouter();
  const routeStore  = useRoutesStore();

  const navigateTo = (route:string) => {
    router.push(route);
  };
  </script>
  
  <style scoped>
  .gap-4 {
    gap: 16px;
  }
  </style>
  
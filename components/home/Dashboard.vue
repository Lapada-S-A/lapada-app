<template>
      <div class="d-flex flex-wrap justify-center align-start gap-4">
        <ButtonWithAction
          v-for="action in routeStore.menuRoutes"
          :key="action.label"
          :label="action.label"
          :icon="action.icon"
          :on-click="() => router.push(action.to)"
        />
      </div>
  </template>
  
  <script setup lang="ts">
  import ButtonWithAction from '../common/ButtonWithAction.vue';
  const router = useRouter();
  const routeStore  = useRoutesStore();
  </script>
  
  <style scoped>
  .gap-4 {
    gap: 16px;
  }
  </style>
  
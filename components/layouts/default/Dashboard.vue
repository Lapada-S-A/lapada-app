<template>
      <div class="d-flex flex-wrap justify-center align-start gap-4">
        <LayoutsDefaultButtonWithAction
          v-for="action in userActions"
          :key="action.label"
          :label="action.label"
          :icon="action.icon"
          :onClick="() => navigateTo(action.route)"
        />
      </div>
  </template>
  
  <script setup lang="ts">
  import { useUserActionsStore } from "@/stores/user-actions";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const { userActions } = useUserActionsStore();
  
  const navigateTo = (route:string) => {
    router.push(route);
  };
  </script>
  
  <style scoped>
  .d-flex {
    display: flex;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .gap-4 {
    gap: 16px;
  }
  </style>
  
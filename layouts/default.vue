<template>
  <v-layout class="h-100">
    <Snackbar />
    <LayoutsDefaultNavigationDrawer />
    <LayoutsDefaultAppBar />
    <v-main>
      <v-container
        class="d-flex justify-center align-center px-8 pa-0 bg-primary-60"
        fluid
      >
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import Snackbar from "@/components/common/Snackbar.vue";
</script>

<style scoped>
:deep(.v-application__wrap) {
  min-height: calc(100vh - 64px);
  padding-bottom: 12px;
  background-color: rgba(var(--v-theme-primary-60)) !important;
}
</style>

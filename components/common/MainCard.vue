<template>
  <v-card class="full-height pa-6">
    <slot />
  </v-card>
</template>

<style scoped>
.full-height {
  min-height: calc(100vh - 86px) !important;
  border-radius: 6px;
}
</style>

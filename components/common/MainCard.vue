<template>
  <v-card class="calc-height pa-6">
    <slot />
  </v-card>
</template>

<style scoped>
.calc-height {
  height: calc(100vh - 90px) !important;
  border-radius: 6px;
}
</style>

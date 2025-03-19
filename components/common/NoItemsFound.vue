<template>
  <div class="d-flex flex-column align-center justify-center h-100">
    <v-icon size="125" color="secondary">{{ icon }}</v-icon>
    <div
      class="mt-4 mb-16 font-subtitle font-weight-semibold text-secondary text-center"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ icon: string; message: string }>();
</script>

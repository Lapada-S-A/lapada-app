<template>
  <div class="d-flex justify-center align-center">
    <v-progress-circular
      indeterminate
      color="secondary"
      :size="size"
      :width="width"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ size: number; width: number }>();
</script>

<template>
  <div
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      fontSize: `${fontSize}px`,
    }"
    class="d-flex align-center justify-center bg-secondary rounded-circle text-font-10 font-weight-bold"
  >
    {{ getUserInitials(username) }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ username: string; size: number; fontSize: number }>();
</script>

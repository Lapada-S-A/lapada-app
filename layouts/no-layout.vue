<template>
  <v-layout>
    <Snackbar />
    <slot />
  </v-layout>
</template>

<script setup lang="ts">
import Snackbar from "@/components/common/Snackbar.vue";
</script>

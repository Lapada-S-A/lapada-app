<template>
  <div class="d-flex flex-column justify-center ga-1 h-100">
    <v-btn class="btn btn-primary" width="225">
      <template #prepend>
        <v-icon class="mr-2">mdi-message-outline</v-icon>
      </template>
      <div>Falar com vendedor</div>
    </v-btn>
    <SellerReviewDialog />
  </div>
</template>

<script setup lang="ts">
import SellerReviewDialog from './SellerReviewDialog.vue';

</script>

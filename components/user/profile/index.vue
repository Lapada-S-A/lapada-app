<template>
  <MainCard>
    <div class="d-flex flex-column justify-space-between py-8 px-16 h-100">
      <div class="d-flex">
        <div class="mr-16 d-flex flex-column align-center justify-center">
          <UserProfileAvatar />
          <UserProfileActions />
        </div>
        <div class="ml-16 w-100">
          <UserProfileInfo />
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn class="btn btn-primary" width="120" @click="$router.back()">
          Fechar
        </v-btn>
      </div>
    </div>
  </MainCard>
</template>

<script setup lang="ts">
import MainCard from "@/components/common/MainCard.vue";
</script>

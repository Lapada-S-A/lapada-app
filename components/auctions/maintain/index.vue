<template>
  <MainCard>
    <div class="pa-4">
      <div class="mb-10">
        <Specification />

        <ImagesUpload />
      </div>

      <div class="d-flex justify-end ga-2">
        <v-btn class="btn btn-secondary" height="37" width="120"
          >Cancelar</v-btn
        >
        <v-btn class="btn btn-primary" height="37" width="120">Salvar</v-btn>
      </div>
    </div>
  </MainCard>
</template>

<script setup lang="ts">
import MainCard from "~/components/common/MainCard.vue";
import Specification from "./Specification.vue";
import ImagesUpload from "./ImagesUpload.vue";
</script>

<style scoped>
:deep(.v-field__append-inner > .v-icon),
:deep(.v-file-upload-icon) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
  cursor: pointer;
}
</style>

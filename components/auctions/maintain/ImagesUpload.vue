<template>
  <div class="mb-8">
    <span class="font-subtitle font-weight-bold text-primary mr-3">Fotos</span>
    <span class="font-small text-font-60">(máx: 4)</span>
  </div>
  <div class="d-flex align-center">
    <v-file-upload
      v-model="images"
      max-width="75"
      max-height="75"
      browse-text=""
      title=""
      divider-text=""
      icon=""
      multiple
      clearable
      @change="images = images.slice(0, 4)"
    >
      <template #browse="{ props }">
        <v-btn variant="plain" size="75" @click="props.onClick">
          <v-icon size="30" color="primary">mdi-cloud-upload-outline</v-icon>
        </v-btn>
      </template>

      <template #item="{ file, props }">
        <div class="d-flex flex-column position-relative">
          <img :src="getImagePreview(file)" class="image-preview" >
          <v-icon
            class="remove-icon position-absolute"
            @click="props['onClick:remove']"
          >
            mdi-close
          </v-icon>
        </div>
      </template>
    </v-file-upload>
  </div>
</template>

<script setup lang="ts">
const images = ref<File[]>([]);

function getImagePreview(file: File) {
  if (file && file.type.startsWith("image/")) {
    return URL.createObjectURL(file);
  }
  return "";
}
</script>

<style scoped>
:deep(.v-file-upload-divider) {
  display: none;
}

:deep(.v-sheet) {
  padding: 0;
  margin-right: 8px;
  border-color: rgba(var(--v-theme-secondary));
}

:deep(.v-file-upload-items) {
  display: flex;
  gap: 8px;
  margin: 0;
}

img {
  width: 75px;
  height: 75px;
  border-radius: 6px;
}

.image-preview {
  width: 75px;
  height: 75px;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.remove-icon {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.position-relative:hover .remove-icon {
  opacity: 1;
}
</style>

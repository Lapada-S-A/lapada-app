<template>
  <v-row>
    <v-col cols="2">
      <v-slide-group class="side-image-carousel" direction="vertical">
        <v-slide-group-item v-for="(image, index) in base64images" :key="index">
          <v-card class="rounded-lg" elevation="0">
            <v-img
              :src="image"
              class="rounded-lg clickable-image mb-2"
              width="150"
              height="119"
              cover
              @click="setMainImage(image)"
            />
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-col>

    <v-col cols="10" class="px-0">
      <v-img :src="mainImage" class="rounded mb-2 main-image" cover />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Buffer } from "buffer";

const props = defineProps({
  images: { type: Array as () => Buffer[], required: true },
});

const base64images = ref<string[]>([]);
const mainImage = ref("");

watch(
  () => props.images,
  (newImages) => {
    if (newImages.length > 0) {
      newImages.forEach((img) => {
        const base64String = Buffer.from(
          img as unknown as string,
          "binary"
        ).toString("base64");
        base64images.value.push(`data:image/png;base64,${base64String}`);
      });
      mainImage.value = base64images.value[0];
    }
  },
  { immediate: true }
);

const setMainImage = (image: string) => {
  mainImage.value = image;
};
</script>

<style scoped>
.clickable-image {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.clickable-image:hover {
  transform: scale(1.02);
}

.main-image {
  max-width: 830px;
  height: 500px;
}
</style>

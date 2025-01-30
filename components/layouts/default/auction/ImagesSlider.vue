<template>
  <v-row>
    <v-col cols="2">
      <v-slide-group class="side-image-carousel" direction="vertical">
        <v-slide-group-item
          v-for="(image, index) in images"
          :key="index"
          class="rounded-lg"
        >
          <v-img
            :src="image"
            class="rounded-lg clickable-image mb-2"
            @click="setMainImage(image)"
            cover
            height="119"
            width="150"
          ></v-img>
        </v-slide-group-item>
      </v-slide-group>
    </v-col>

    <v-col cols="10">
      <v-img
        :src="mainImage"
        class="rounded mb-2 main-image clickable-image"
        cover
      ></v-img>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const props = defineProps({
  images: { type: Array as () => string[], required: true },
});

const mainImage = ref(props.images[0] || "");

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
  transform: scale(1.03);
}

.main-image {
  height: 500px;
}
</style>

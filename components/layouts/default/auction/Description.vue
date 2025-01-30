<template>
  <v-col cols="12" class="mt-4 mb-5">
    <h3 class="font-weight-bold text-primary text-subtitle-1">Descrição</h3>
    <p class="text-justify text-body-2 opacity-50">
      {{ showMore ? description : truncatedDescription }}
      <span
        v-if="description.length > maxChars"
        variant
        small
        color="primary"
        class="open-text"
        @click="toggleShowMore"
      >
        {{ showMore ? "Ver menos" : "Ver mais" }}
      </span>
    </p>
  </v-col>
</template>
<script setup lang="ts">
const props = defineProps({
  description: { type: String, required: true },
  maxChars: { type: Number, default: 800 },
});

const showMore = ref(false);

const truncatedDescription = computed(() =>
  props.description.length > props.maxChars
    ? props.description.substring(0, props.maxChars) + "..."
    : props.description
);

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};
</script>
<style scoped>
.open-text {
  cursor: pointer;
  color: #1976d2;
  text-decoration: underline;
}
</style>

<template>
  <v-col cols="12" class="mt-2 mb-5">
    <div class="font-weight-semibold text-primary">Descrição</div>
    <div class="text-justify text-font-60 mt-2 description">
      {{ showMore ? description : truncatedDescription }}
      <span
        v-if="description.length > maxChars"
        variant
        small
        color="primary"
        class="cursor-pointer text-secondary text-decoration-underline"
        @click="toggleShowMore"
      >
        {{ showMore ? "Ver menos" : "Ver mais" }}
      </span>
    </div>
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
.description {
  line-height: 20px !important;
}
</style>

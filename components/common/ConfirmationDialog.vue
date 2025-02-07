<template>
  <v-dialog v-model="show" max-width="300" opacity="0.4" persistent>
    <v-card class="pa-8">
      <div
        class="d-flex font-large text-justify align-center ga-6"
      >
        <div>{{ text }} <span class="font-weight-bold">{{ highlight }}</span>?</div>
      </div>
      <div class="d-flex justify-space-between align-center mt-8">
        <v-btn
          id="no-btn"
          width="110"
          height="35"
          variant="outlined"
          class="btn btn-secondary no-btn text-font-100"
          @click="handleNoClick"
        >
          Não
        </v-btn>
        <v-btn
          id="yes-btn"
          width="110"
          height="35"
          variant="outlined"
          class="btn btn-primary"
          @click="handleYesClick"
        >
          Sim
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "confirm"]);
const props = defineProps({
  parentShow: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "",
  },
  highlight: {
    type: String,
    default: "",
  },
});

const show = computed({
  get: () => props.parentShow,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const handleYesClick = () => {
  emit("update:modelValue", false);
  emit("confirm");
};

const handleNoClick = () => {
  emit("update:modelValue", false);
};
</script>

<style scoped>
.no-btn {
  border: 1px solid rgba(var(--v-theme-font-60)) !important;
}
</style>

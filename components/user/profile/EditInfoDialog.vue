<template>
  <v-dialog v-model="show" opacity="0.4" max-width="500" persistent>
    <v-card class="rounded-lg pa-4">
      <div>
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="font-subtitle font-weight-bold">Editar informação</div>
          <v-btn
            id="close-filter-button"
            class="rounded-xl"
            variant="plain"
            :ripple="false"
            size="22"
            @click="cancel"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </div>

      <v-card-text class="px-4 py-4">
        <div class="font-weight-medium mb-2">{{ label }}</div>
        <v-text-field v-model="infoToEdit" :placeholder="label" />
      </v-card-text>

      <v-card-actions class="px-4">
        <v-spacer />
        <v-btn
          class="btn btn-primary px-6 ml-2"
          :class="{ 'btn-disabled': !changed }"
          @click="confirm"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["confirmed", "update:modelValue"]);
const props = defineProps({
  parentShow: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
});

const infoToEdit = ref<string | null>(props.info);

const show = computed({
  get: () => props.parentShow,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

watch(
  () => props.info,
  (newValue) => {
    infoToEdit.value = newValue;
  }
);

const changed = computed(() => {
  return props.info !== infoToEdit.value;
});

function cancel() {
  show.value = false;
  infoToEdit.value = props.info;
}

function confirm() {
  emit("confirmed", infoToEdit.value);
  show.value = false;
  infoToEdit.value = null;
}
</script>

<style scoped>
:deep(.v-input__prepend > .v-icon),
:deep(.v-field__append-inner > .v-icon, ) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
}
</style>

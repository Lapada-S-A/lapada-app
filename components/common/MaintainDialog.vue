<template>
  <v-dialog v-model="show" opacity="0.4" max-width="500" persistent>
    <v-card class="rounded-lg pa-4">
      <div>
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="font-subtitle font-weight-bold">{{ title }}</div>
          <v-btn
            id="close-dialog-button"
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
        <div v-for="(field, index) in sortedFields" :key="index" class="mb-4">
          <div class="font-weight-medium mb-2">{{ field.label }}</div>
          <v-text-field
            v-model="field.value"
            type="text"
            :placeholder="field.label"
          />
        </div>
      </v-card-text>

      <v-card-actions class="px-4">
        <v-spacer />
        <v-btn
          class="btn btn-primary px-6 ml-2"
          :class="{ 'btn-disabled': !canSave }"
          @click="confirm"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["confirm", "update:modelValue"]);
const props = defineProps({
  parentShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array as () => Array<{
      label: string;
      value: string | null;
      key: string;
    }>,
    required: true,
  },
});

const fieldsToEdit = ref<
  { label: string; value: string; key: string }[] | null
>();

const sortedFields = computed(() => {
  if (!fieldsToEdit.value) return [];
  const nameField = fieldsToEdit.value.find((field) => field.key === "name");
  if (nameField) {
    const remainingFields = fieldsToEdit.value.filter(
      (field) => field.key !== "name"
    );
    return [nameField, ...remainingFields];
  }
  return fieldsToEdit.value;
});

const show = computed({
  get: () => props.parentShow,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

watch(
  () => props.fields,
  (newValue) => {
    fieldsToEdit.value = JSON.parse(JSON.stringify(newValue));
  },
  { deep: true }
);

const canSave = computed(() => {
  return (
    fieldsToEdit.value?.every(
      (field) => field.value !== null && field.value !== ""
    ) && JSON.stringify(props.fields) !== JSON.stringify(fieldsToEdit.value)
  );
});

function cancel() {
  show.value = false;
  fieldsToEdit.value = JSON.parse(JSON.stringify(props.fields));
}

function confirm() {
  show.value = false;
  emit("confirm", transformFieldsToItem(fieldsToEdit.value!));
  fieldsToEdit.value = JSON.parse(JSON.stringify(props.fields));
}

function transformFieldsToItem(
  arr: Array<{ label: string; value: string; key: string }>
): { [key: string]: string } {
  return arr.reduce<{ [key: string]: string }>((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});
}
</script>

<style scoped>
:deep(.v-input__prepend > .v-icon),
:deep(.v-field__append-inner > .v-icon) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
}
</style>

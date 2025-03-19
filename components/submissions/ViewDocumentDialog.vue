<template>
  <v-dialog v-model="show" opacity="0.4" max-width="70%" persistent>
    <v-card class="rounded-lg pa-4">
      <div>
        <v-card-title class="d-flex justify-space-between align-center mb-4">
          <div class="font-subtitle font-weight-bold">Visualizar documento</div>
          <v-btn
            id="close-dialog-button"
            class="rounded-xl"
            variant="plain"
            :ripple="false"
            size="22"
            @click="show = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </div>

      <v-card-text class="px-4 pb-4 pt-0 overflow-y-auto">
        <div v-if="documentImage">
          <v-img :src="documentImage as string" width="100%" />
        </div>
        <div v-else class="text-center text-font-60">
          Documento não disponível.
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Buffer } from "buffer";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  parentShow: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as () => Buffer,
    required: true,
  },
});

const show = computed({
  get: () => props.parentShow,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const documentImage = computed(() => {
  if (props.data) {
    const base64String = Buffer.from(
      props.data as unknown as string,
      "binary"
    ).toString("base64");
    return `data:image/png;base64,${base64String}`;
  }
  return null;
});
</script>

<template>
  <v-dialog v-model="show" opacity="0.4" max-width="500" persistent>
    <v-card class="rounded-lg pa-4">
      <div>
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="font-subtitle font-weight-bold">Adicionar categoria</div>
          <v-btn
            id="close-filter-button"
            class="rounded-xl"
            variant="plain"
            :ripple="false"
            size="22"
            @click="cancelCuratorSelection"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </div>

      <v-card-text class="px-4 py-2">
        <div class="font-normal text-font-60">
          *Envie uma foto sua segurando um documento de identificação e anexe um
          documento que certifique seu conhecimento na área escolhida.
        </div>

        <div class="d-flex flex-column py-4">
          <div class="w-100 mt-2">
            <v-label
              for="category-field"
              class="text-font-100 font-weight-semibold mb-2 ml-1"
              >Categoria</v-label
            >
            <v-autocomplete
              id="category-field"
              v-model="category"
              variant="outlined"
              placeholder="Categoria"
              :items="['Automóvel', 'Luxo', 'Antiguidades']"
            />
          </div>

          <div class="w-100 mt-2">
            <v-label
              for="photo-upload"
              class="text-font-100 font-weight-semibold mb-2 ml-1"
              >Comprovante de identidade</v-label
            >
            <v-file-input
              id="photo-upload"
              v-model="photo"
              accept="image/*"
              variant="outlined"
              color="primary"
              clear-icon="mdi-close"
            >
              <template #prepend-inner>
                <div v-if="!photo" class="file-input-placeholder">
                    Comprovante de identidade
                </div></template
              ></v-file-input
            >
          </div>

          <div class="w-100 mt-2">
            <v-label
              for="document-upload"
              class="text-font-100 font-weight-semibold mb-2 ml-1"
              >Certificado de conhecimento</v-label
            >
            <v-file-input
              id="document-upload"
              v-model="document"
              accept=".pdf,.doc,.docx,.jpg,.png"
              variant="outlined"
              color="primary"
              clear-icon="mdi-close"
            >
              <template #prepend-inner>
                <div v-if="!document" class="file-input-placeholder">
                  Certificado de conhecimento
                </div></template
              >
            </v-file-input>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="px-4">
        <v-spacer />
        <v-btn
          class="btn btn-primary px-6 ml-2"
          :class="{ 'btn-disabled': !confirmEnabled }"
          @click="confirmCuratorSelection"
        >
          Confirmar
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
});

const show = computed({
  get: () => props.parentShow,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
const category = ref();
const photo = ref();
const document = ref();

const confirmEnabled = computed(() => {
  return category.value && photo.value && document.value;
});

function confirmCuratorSelection() {
  show.value = false;
  emit("confirmed");
}

function cancelCuratorSelection() {
  show.value = false;
  category.value = null;
  photo.value = null;
  document.value = null;
}
</script>

<style scoped>
:deep(.v-input__prepend > .v-icon) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
}

.file-input-placeholder {
  width: 400px !important;
  opacity: 0.4;
}
</style>

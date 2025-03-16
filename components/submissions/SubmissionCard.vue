<template>
  <v-card class="d-flex pa-6" height="160">
    <v-row justify="space-between">
      <v-col>
        <div>
          <div class="font-weight-semibold text-primary font-normal mb-2">
            Usuário
          </div>
          <div class="font-subtitle font-weight-bold">
            {{ submission.user.username }}
          </div>
        </div>
      </v-col>
      <v-col>
        <div>
          <div class="font-weight-semibold text-primary font-normal mb-2">
            Categoria
          </div>
          <div class="font-subtitle font-weight-bold">
            {{ submission.category.name }}
          </div>
        </div>
      </v-col>
      <v-col>
        <div>
          <div class="font-weight-semibold text-primary font-normal mb-2">
            Comprovante de identidade
          </div>
          <v-btn
            class="btn btn-primary"
            prepend-icon="mdi-card-account-details-outline"
            @click="openDialog(true)"
            >Visualizar</v-btn
          >
        </div>
      </v-col>
      <v-col>
        <div>
          <div class="font-weight-semibold text-primary font-normal mb-2">
            Certificado de conhecimento
          </div>
          <v-btn
            class="btn btn-primary"
            prepend-icon="mdi-certificate-outline"
            @click="openDialog(false)"
            >Visualizar</v-btn
          >
        </div>
      </v-col>
      <v-col class="d-flex align-end justify-end">
        <v-btn
          class="btn btn-primary bg-error mr-2"
          width="140"
          @click="
            approve = false;
            confirmAction();
          "
          >Rejeitar</v-btn
        >
        <v-btn
          class="btn btn-primary bg-success"
          width="140"
          @click="
            approve = true;
            confirmAction();
          "
          >Aprovar</v-btn
        >
      </v-col>
    </v-row>
  </v-card>

  <ViewDocumentDialog
    v-model="viewDocumentDialog"
    :data="currentDocument!"
    :is-identity-document="isIdentityDocument"
  />
</template>

<script setup lang="ts">
import type { Submission } from "~/interfaces/submission";

import ViewDocumentDialog from "./ViewDocumentDialog.vue";

const componentProps = defineProps<{ submission: Submission }>();
const emit = defineEmits(["openConfirmationDialog"]);
const approve = ref<boolean>(true);
const viewDocumentDialog = ref<boolean>(false);
const currentDocument = ref<Buffer | null>(null);
const isIdentityDocument = ref<boolean>(false);

function openDialog(isIdentity: boolean) {
  isIdentityDocument.value = isIdentity;
  const document = componentProps.submission.documents.find(
    (doc) => doc.isIdentityDocument === isIdentityDocument.value
  );

  if (document) {
    currentDocument.value = document.pdfData.data;
    viewDocumentDialog.value = true;
  }
}

function confirmAction() {
  const action = approve.value ? "aprovar" : "rejeitar";
  emit(
    "openConfirmationDialog",
    "Você tem certeza que deseja",
    `${action} essa submissão`,
    approve.value,
    componentProps.submission.id
  );
}
</script>

<template>
  <v-card class="d-flex pa-6" height="160">
    <v-row justify="space-between">
      <v-col>
        <div>
          <div class="font-weight-semibold text-primary font-normal mb-2">
            Curador
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
            >Visualizar</v-btn
          >
        </div>
      </v-col>
      <v-col>
        <div>
          <div class="font-weight-semibold text-primary font-normal mb-2">
            Certificado de conhecimento
          </div>
          <v-btn class="btn btn-primary" prepend-icon="mdi-certificate-outline"
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
</template>

<script setup lang="ts">
import type { Submission } from "~/interfaces/submission";

const componentProps = defineProps<{ submission: Submission }>();
const emit = defineEmits(["openConfirmationDialog"]);
const approve = ref<boolean>(true);

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

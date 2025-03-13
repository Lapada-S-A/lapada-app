<template>
  <div>
    <SubmissionsSubmissionCard
      v-for="sub in submissions"
      :key="sub.id"
      :submission="sub"
      class="my-2"
      @open-confirmation-dialog="openConfirmationDialog"
    />

    <CommonConfirmationDialog
      v-model="confirmDialog"
      :text="confirmText"
      :highlight="confirmHighlight"
      @confirm="confirmAction"
    />
  </div>
</template>

<script setup lang="ts">
import type { Submission } from "~/interfaces/submission";

const snackbarStore = useSnackbarStore();
const confirmDialog = ref<boolean>(false);
const confirmText = ref<string>("");
const confirmHighlight = ref<string>("");
const approve = ref<boolean>(false);
const analysedSubmissionId = ref<number>();

function openConfirmationDialog(
  text: string,
  highlight: string,
  approveValue: boolean,
  submissionId: number
) {
  confirmText.value = text;
  confirmHighlight.value = highlight;
  approve.value = approveValue;
  analysedSubmissionId.value = submissionId;
  confirmDialog.value = true;
}

function confirmAction() {
  const status = approve.value ? "aprovada" : "rejeitada";
  const color = approve.value ? "success" : "error";
  submissions = submissions.filter(
    (sub) => sub.id !== analysedSubmissionId.value
  );

  snackbarStore.showSnackbar(color, `A submissão foi ${status}.`);
}

let submissions: Submission[] = [
  {
    id: 1,
    user: { id: 1, username: "Juan Farias" },
    category: { id: 1, name: "Automóvel" },
    documents: [],
  },
  {
    id: 2,
    user: { id: 2, username: "Maria Oliveira" },
    category: { id: 2, name: "Tecnologia" },
    documents: [],
  },
  {
    id: 3,
    user: { id: 3, username: "Carlos Souza" },
    category: { id: 3, name: "Educação" },
    documents: [],
  },
];
</script>

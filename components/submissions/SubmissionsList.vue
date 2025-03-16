<template>
  <div class="h-100">
    <div
      v-if="
        !submissionsStore.loading && submissionsStore.submissions.length === 0
      "
      class="d-flex flex-column align-center justify-center h-100 mt-n16"
    >
      <v-icon class="mt-n16" size="125" color="secondary">mdi-file-remove-outline</v-icon>
      <div
        class="mt-4 font-subtitle font-weight-semibold text-secondary text-center"
      >
        Nenhuma submissão encontrada
      </div>
    </div>
    <div
      v-if="submissionsStore.loading"
      class="d-flex h-100 justify-center align-center mt-n8"
    >
      <v-progress-circular
        indeterminate
        color="secondary"
        size="55"
        width="5"
      />
    </div>

    <SubmissionsSubmissionCard
      v-for="sub in submissionsStore.submissions"
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
const snackbarStore = useSnackbarStore();
const submissionsStore = useSubmissionsStore();
const confirmDialog = ref<boolean>(false);
const confirmText = ref<string>("");
const confirmHighlight = ref<string>("");
const approve = ref<boolean>(false);
const analysedSubmissionId = ref<number>();

onMounted(async () => {
  await submissionsStore.getAllSubmissions();
});

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

async function confirmAction() {
  const status = approve.value ? "aprovada" : "rejeitada";
  const color = approve.value ? "success" : "error";
  let response;

  if (approve.value) {
    response = await submissionsStore.approveSubmission(
      analysedSubmissionId.value!
    );
  } else {
    response = await submissionsStore.rejectSubmission(
      analysedSubmissionId.value!
    );
  }

  if (response) {
    submissionsStore.submissions = submissionsStore.submissions.filter(
      (sub) => sub.id !== analysedSubmissionId.value
    );
    snackbarStore.showSnackbar(color, `A submissão foi ${status}.`);
  }
}
</script>

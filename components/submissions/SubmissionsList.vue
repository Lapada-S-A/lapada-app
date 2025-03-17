<template>
  <div class="h-100">
    <div
      v-if="
        !submissionsStore.loading && submissionsStore.submissions.length === 0
      "
      class="h-100"
    >
      <CommonNoItemsFound
        :icon="'mdi-file-remove-outline'"
        :message="'Nenhuma submissão encontrada'"
      />
    </div>

    <div
      v-if="submissionsStore.loading"
      class="d-flex h-75 justify-center align-center"
    >
      <CommonLoading :size="70" :width="6" />
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

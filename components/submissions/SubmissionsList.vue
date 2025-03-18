<template>
  <div class="h-75">
    <div
      v-if="
        !submissionsStore.loading &&
        !promotionsStore.loading &&
        submissions.length === 0
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
      class="d-flex h-100 justify-center align-center"
    >
      <CommonLoading :size="70" :width="6" />
    </div>

    <div v-else>
      <SubmissionsSubmissionCard
        v-for="sub in submissions"
        :key="sub.id"
        :submission="sub"
        @open-confirmation-dialog="openConfirmationDialog"
      />

      <CommonConfirmationDialog
        v-model="confirmDialog"
        :text="confirmText"
        :highlight="confirmHighlight"
        @confirm="confirmAction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SubmissionTypes } from "~/stores/enum";

const componentProps = defineProps<{ typeId: number }>();
const snackbarStore = useSnackbarStore();
const submissionsStore = useSubmissionsStore();
const promotionsStore = usePromotionsStore();
const confirmDialog = ref<boolean>(false);
const confirmText = ref<string>("");
const confirmHighlight = ref<string>("");
const approve = ref<boolean>(false);
const analysedSubmissionId = ref<number>();

const submissions = computed(() => {
  if (componentProps.typeId === SubmissionTypes.CURATOR) {
    return submissionsStore.submissions;
  } else {
    return promotionsStore.promotions;
  }
});

onMounted(async () => {
  await submissionsStore.getAllSubmissions();
  await promotionsStore.getAllPromotions();
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
    if (componentProps.typeId === SubmissionTypes.CURATOR) {
      response = await submissionsStore.approveSubmission(
        analysedSubmissionId.value!
      );
    } else {
      response = await promotionsStore.approvePromotion(
        analysedSubmissionId.value!
      );
    }
  } else {
    if (componentProps.typeId === SubmissionTypes.CURATOR) {
      response = await submissionsStore.rejectSubmission(
        analysedSubmissionId.value!
      );
    } else {
      response = await promotionsStore.rejectPromotion(
        analysedSubmissionId.value!
      );
    }
  }

  if (response) {
    if (componentProps.typeId === SubmissionTypes.CURATOR) {
      submissionsStore.submissions = submissionsStore.submissions.filter(
        (sub) => sub.id !== analysedSubmissionId.value
      );
    } else {
      promotionsStore.promotions = promotionsStore.promotions.filter(
        (sub) => sub.id !== analysedSubmissionId.value
      );
    }

    snackbarStore.showSnackbar(color, `A submissão foi ${status}.`);
  }
}
</script>

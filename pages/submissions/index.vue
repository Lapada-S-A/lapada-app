<template>
  <div class="h-100">
    <SubmissionsFilterOptions v-model:type-selected="typeIdSelected" />
    <SubmissionsList :type-id="typeIdSelected" />
  </div>
</template>

<script setup lang="ts">
import SubmissionsList from "~/components/submissions/SubmissionsList.vue";
import SubmissionsFilterOptions from "~/components/submissions/SubmissionsFilterOptions.vue";
import { SubmissionTypes } from "~/stores/enum";

const typeIdSelected = ref<number>(SubmissionTypes.CURATOR);
</script>

import type { Submission } from "~/interfaces/submission";

export const useSubmissionsStore = defineStore("submissions", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);
  const submissions = ref<Submission[]>([]);

  const getAllSubmissions = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await $api.submission.getAll();
      if (response) submissions.value = response;
    } finally {
      loading.value = false;
    }
  };

  const addSubmission = async (
    curatorId: number,
    categoryId: number,
    receipt: File,
    identityDocument?: File
  ): Promise<Submission | undefined> => {
    loading.value = true;
    try {
      const response = await $api.submission.add(
        curatorId,
        categoryId,
        receipt,
        identityDocument
      );
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const approveSubmission = async (
    submissionId: number
  ): Promise<Submission | undefined> => {
    loading.value = true;
    try {
      const response = await $api.submission.approve(submissionId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const rejectSubmission = async (
    submissionId: number
  ): Promise<Submission | undefined> => {
    loading.value = true;
    try {
      const response = await $api.submission.reject(submissionId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    submissions,
    getAllSubmissions,
    addSubmission,
    approveSubmission,
    rejectSubmission,
  };
});

import type { Document } from "~/interfaces/document";

export const useDocumentsStore = defineStore("document", () => {
  const { $api } = useNuxtApp();
  const loading = ref<boolean>(false);

  const sendDocument = async (
    document: File,
    userId: number
  ): Promise<Document | undefined> => {
    loading.value = true;
    try {
      const response = await $api.document.send(document, userId);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  return {
    sendDocument,
  };
});

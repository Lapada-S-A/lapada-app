import type { Chat, Message } from "~/interfaces/chat";

export const useChatsStore = defineStore("chats", () => {
  const { $api } = useNuxtApp();
  const loading = ref(false);
  const chats = ref<Chat[]>([]);

  const getChatsByUserId = async (userId: number): Promise<void> => {
    loading.value = true;
    try {
      const response = await $api.chat.getByUserId(userId);
      if (response) chats.value = response;
    } finally {
      loading.value = false;
    }
  };

  const addChat = async (usersIds: number[]): Promise<Chat | undefined> => {
    loading.value = true;
    try {
      const response = await $api.chat.add(usersIds);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const sendMessageToChat = async (
    message: Message
  ): Promise<Message | undefined> => {
    loading.value = true;
    try {
      const response = await $api.chat.sendMessage(message);
      if (response) return response;
    } finally {
      loading.value = false;
    }
  };

  const getChatMessages = async (
    chatId: number
  ): Promise<Message[] | undefined> => {
    loading.value = true;
    try {
      return await $api.chat.getMessages(chatId);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    chats,
    getChatsByUserId,
    addChat,
    sendMessageToChat,
    getChatMessages,
  };
});

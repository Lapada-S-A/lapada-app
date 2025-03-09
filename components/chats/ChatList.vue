<template>
  <CommonMainCard>
    <div
      v-if="!chatsStore.loading && chats.length === 0"
      class="d-flex flex-column align-center justify-center h-100"
    >
      <v-icon class="mt-n16" size="125" color="secondary"
        >mdi-forum-remove-outline</v-icon
      >
      <div
        class="mt-4 mb-16 font-subtitle font-weight-semibold text-secondary text-center"
      >
        Nenhuma conversa encontrada
      </div>
    </div>
    <div v-if="chatsStore.loading" class="d-flex h-100 mt-n16 justify-center align-center">
      <v-progress-circular
        indeterminate
        class="mt-16 pt-16"
        color="secondary"
        size="55"
        width="5"
      />
    </div>
    <ChatPreview
      v-for="chat in chats"
      :key="chat.chat_id"
      :chat="chat"
      :is-last-chat="chats.indexOf(chat) === chats.length - 1"
    />
  </CommonMainCard>
</template>

<script setup lang="ts">
import type { Chat } from "~/interfaces/chat";
import ChatPreview from "./ChatPreview.vue";

const chatsStore = useChatsStore();
const userStore = useUserStore();

const chats = ref<Chat[]>([]);

onBeforeMount(async () => {
  await chatsStore.getChatsByUserId(userStore.currentUser!.id!);
  chats.value = chatsStore.chats;
});
</script>

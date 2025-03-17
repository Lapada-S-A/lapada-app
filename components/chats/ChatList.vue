<template>
  <CommonMainCard>
    <div v-if="!chatsStore.loading && chats.length === 0" class="h-100">
      <CommonNoItemsFound
        :icon="'mdi-forum-remove-outline'"
        :message="'Nenhuma conversa encontrada'"
      />
    </div>
    <div
      v-if="chatsStore.loading"
      class="d-flex h-100 mt-n16 justify-center align-center"
    >
      <CommonLoading :size="70" :width="6" />
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

<template>
  <CommonMainCard>
    <div v-if="loading" class="d-flex justify-center align-center h-100">
      <CommonLoading :size="70" :width="6" />
    </div>

    <div v-else class="h-100">
      <div
        class="bg-primary-60 h-100 rounded d-flex flex-column justify-space-between"
      >
        <div
          v-if="receiver"
          class="bg-primary rounded-t py-3 pl-4 pr-8 d-flex align-center ga-4 shadow"
        >
          <v-icon
            size="24"
            class="cursor-pointer"
            @click="$router.push('/chats')"
            >mdi-arrow-left</v-icon
          >
          <CommonUserInitials
            :username="receiver.name"
            :size="50"
            :font-size="20"
          />
          <div class="font-title font-weight-bold">{{ receiver.name }}</div>
        </div>
        <div class="d-flex flex-column justify-space-between">
          <div
            ref="messagesContainer"
            class="messages-container pt-8 px-8 pb-0 d-flex flex-column ga-3"
          >
            <div
              v-if="sortedMessages.length === 0"
              class="text-center text-font-60"
            >
              Nenhuma mensagem ainda
            </div>
            <div
              v-for="message in sortedMessages"
              :key="message.id"
              class="d-flex flex-column"
              :class="[
                message.sender_id === userStore.currentUser?.id
                  ? 'align-end'
                  : 'align-start',
              ]"
            >
              <div class="bg-message py-2 px-3 mb-2 rounded-lg">
                {{ message.content }}
              </div>
              <div class="d-flex font-small text-font-60 text-right">
                {{ formatDatetime(message.date!) }}
              </div>
            </div>
          </div>
          <div class="px-4">
            <v-text-field
              v-model="newMessage"
              type="text"
              placeholder="Digite uma mensagem"
              hide-details
              density="comfortable"
              class="mt-12 mb-4 bg-font-10"
              autofocus
              @keyup.enter="sendMessage"
            >
              <template #append-inner>
                <v-icon color="primary mr-1" @click="sendMessage"
                  >mdi-send</v-icon
                >
              </template>
            </v-text-field>
          </div>
        </div>
      </div>
    </div>
  </CommonMainCard>
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
import type { Message } from "~/interfaces/chat";

const userStore = useUserStore();
const chatsStore = useChatsStore();
const route = useRoute();
const { id } = route.params;
const newMessage = ref("");
const messagesContainer = ref<HTMLElement | null>(null);
const sortedMessages = ref<Message[]>([]);
const loading = ref<boolean>(false);
const receiver = ref<{ id: number; name: string }>();

const socket = io("http://localhost:5000");
socket.emit("join_chat", { chat_id: +id });

onBeforeMount(async () => {
  loading.value = true;
  await chatsStore.getChatsByUserId(userStore.currentUser!.id!);
  const chat = chatsStore.chats.find((chat) => chat.chat_id === +id);
  if (chat) {
    const receiverId = chat.users.find(
      (userId) => userId !== userStore.currentUser?.id
    )!;
    const response = await userStore.getClientById(receiverId);
    if (response) {
      receiver.value = { id: receiverId, name: response.username };
    }
  }
  const messages = await chatsStore.getChatMessages(+id);
  loading.value = false;

  if (messages) {
    sortedMessages.value = messages.sort((a, b) => {
      const dateA = new Date(a.date!);
      const dateB = new Date(b.date!);
      return dateA.getTime() - dateB.getTime();
    });
  }

  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });

  socket.on(
    "new_message",
    (event: {
      chat_id: number;
      sender_id: number;
      content: string;
      date: string;
    }) => {
      const receivedMessage: Message = {
        id: sortedMessages.value.length + 1,
        chat_id: event.chat_id,
        sender_id: event.sender_id,
        content: event.content,
        date: event.date,
      };
      sortedMessages.value.push(receivedMessage);
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
        }
      });
    }
  );
});

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    const newMsg = {
      chat_id: +id,
      sender_id: userStore.currentUser!.id!,
      content: newMessage.value,
    };

    await chatsStore.sendMessageToChat(newMsg);
    newMessage.value = "";
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    });
  }
};
</script>

<style scoped>
.bg-message {
  background-color: #e0e0e0;
  max-width: 50%;
  word-wrap: break-word;
}

.messages-container {
  max-height: calc(100vh - 310px);
  overflow-y: auto;
}

:deep(.v-field__append-inner > .v-icon) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
  cursor: pointer;
}
.shadow {
  box-shadow: 0px 1.5px 1.5px 0px rgba(160, 160, 160, 0.58);
}
</style>

<template>
  <CommonMainCard>
    <div
      class="bg-primary-60 h-100 rounded d-flex flex-column justify-space-between"
    >
      <div
        class="bg-primary rounded-t py-3 pl-4 pr-8 d-flex align-center ga-4 shadow"
      >
        <v-icon size="24" class="cursor-pointer" @click="$router.back()"
          >mdi-arrow-left</v-icon
        >
        <div
          class="d-flex justify-center align-center user-initials font-subtitle font-weight-bold bg-secondary text-font-10 rounded-circle"
        >
          {{ getUserInitials("Marcela Kramer").toUpperCase() }}
        </div>
        <div class="font-title font-weight-bold">Marcela Kramer</div>
      </div>
      <div
        ref="messagesContainer"
        class="messages-container pt-8 px-8 pb-0 d-flex flex-column ga-3"
      >
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
            {{ formatDatetime(message.date) }}
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
            <v-icon color="primary mr-1" @click="sendMessage">mdi-send</v-icon>
          </template>
        </v-text-field>
      </div>
    </div>
  </CommonMainCard>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const newMessage = ref("");
const messagesContainer = ref<HTMLElement | null>(null);
const sortedMessages = ref<
  { id: number; sender_id: number; content: string; date: string }[]
>([]);
let ws: WebSocket;

onMounted(() => {
  ws = new WebSocket("ws://localhost:5000");

  ws.onmessage = (event) => {
    const receivedMessage = {
      id: sortedMessages.value.length + 1,
      sender_id: 2,
      content: event.data,
      date: convertDate(new Date()),
    };
    sortedMessages.value.push(receivedMessage);
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    });
  };
});

const sendMessage = () => {
  if (newMessage.value.trim()) {
    const newMsg = {
      id: sortedMessages.value.length + 1,
      sender_id: userStore.currentUser!.id!,
      content: newMessage.value,
      date: convertDate(new Date()),
    };
    sortedMessages.value.push(newMsg);
    // ws.send(newMessage.value);
    newMessage.value = "";
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    });
  }
};

const convertDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
};
</script>

<style scoped>
.user-initials {
  height: 50px;
  width: 50px;
}

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

<template>
  <CommonMainCard>
    <div class="bg-primary-60 h-100 rounded d-flex flex-column justify-space-between ">
      <div class="bg-primary rounded-t py-3 pl-4 pr-8 d-flex align-center ga-4 shadow">
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
const messages = [
  {
    id: 1,
    sender_id: 1,
    content: "olá, bom dia",
    date: "22-02-2025-03-00-00",
  },
  {
    id: 2,
    sender_id: 2,
    content: "olá",
    date: "22-02-2025-03-01-00",
  },
  {
    id: 3,
    sender_id: 1,
    content: "vi que você fez o maior lance",
    date: "22-02-2025-03-01-34",
  },
  {
    id: 4,
    sender_id: 1,
    content: "onde você mora?",
    date: "22-02-2025-03-02-45",
  },
  {
    id: 5,
    sender_id: 2,
    content: "Eu moro em São Paulo. E você?",
    date: "22-02-2025-03-03-10",
  },
  {
    id: 6,
    sender_id: 1,
    content: "Eu sou do Rio de Janeiro.",
    date: "22-02-2025-03-03-50",
  },
  {
    id: 7,
    sender_id: 1,
    content: "Você já fez alguma compra no site?",
    date: "22-02-2025-03-04-15",
  },
  {
    id: 8,
    sender_id: 2,
    content: "Sim, comprei um item semana passada. Foi bem rápido!",
    date: "22-02-2025-03-04-55",
  },
  {
    id: 9,
    sender_id: 1,
    content: "Que bom! Eu também comprei uma coisa ontem.",
    date: "22-02-2025-03-05-25",
  },
  {
    id: 10,
    sender_id: 2,
    content: "Que legal, o que você comprou?",
    date: "22-02-2025-03-05-55",
  },
  {
    id: 11,
    sender_id: 1,
    content: "Comprei um livro. Estou começando a ler mais.",
    date: "22-02-2025-03-06-30",
  },
  {
    id: 12,
    sender_id: 2,
    content: "Ah, eu adoro ler também! Que tipo de livros você gosta?",
    date: "22-02-2025-03-07-00",
  },
  {
    id: 13,
    sender_id: 1,
    content: "Gosto de romances históricos. E você?",
    date: "22-02-2025-03-07-30",
  },
  {
    id: 14,
    sender_id: 2,
    content: "Eu gosto de ficção científica, mas também leio romances.",
    date: "22-02-2025-03-08-00",
  },
  {
    id: 15,
    sender_id: 1,
    content: "Ficção científica é ótimo, sempre me fascina!",
    date: "22-02-2025-03-08-30",
  },
  {
    id: 16,
    sender_id: 2,
    content:
      "Sim, é incrível como eles conseguem imaginar futuros tão complexos.",
    date: "22-02-2025-03-09-00",
  },
  {
    id: 17,
    sender_id: 1,
    content: "Concordo! É impressionante a criatividade desses autores.",
    date: "22-02-2025-03-09-30",
  },
  {
    id: 18,
    sender_id: 2,
    content:
      "Bom, foi ótimo conversar com você. Precisamos marcar algo em breve.",
    date: "22-02-2025-03-10-00",
  },
  {
    id: 19,
    sender_id: 1,
    content: "Com certeza! Vamos marcar sim. Até logo!",
    date: "22-02-2025-03-10-30",
  },
];

const sortedMessages = ref(
  [...messages].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
);

const newMessage = ref("");

const messagesContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
});

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    const newMsg = {
      id: messages.length + 1,
      sender_id: userStore.currentUser!.id!,
      content: newMessage.value,
      date: convertDate(new Date()),
    };
    messages.push(newMsg);
    sortedMessages.value = [...messages].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    await nextTick();
    newMessage.value = "";
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
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

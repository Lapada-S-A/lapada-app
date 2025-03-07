<template>
  <CommonMainCard>
    <ChatPreview
      v-for="chat in chats"
      :key="chat.id"
      :chat="chat"
      :is-last-chat="chats.indexOf(chat) === chats.length - 1"
    />
  </CommonMainCard>
</template>

<script setup lang="ts">
import type { Chat } from "~/interfaces/chat";
import ChatPreview from "./ChatPreview.vue";

const chats: Chat[] = [
  {
    id: 1,
    users: [
      { id: 1, name: "Marcela Kramer" },
      { id: 2, name: "Matheus Sousa" },
    ],
    last_message: {
      id: 1,
      sender_id: 1,
      content: "olá, bom dia",
      date: "",
    },
  },
  {
    id: 2,
    users: [
      { id: 1, name: "Marcela Kramer" },
      { id: 3, name: "Juan Farias" },
    ],
    last_message: {
      id: 2,
      sender_id: 3,
      content: "boa noite",
      date: "22-02-2025-03-00-00",
    },
  },
];
</script>

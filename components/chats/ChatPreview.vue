<template>
  <div
    class="bg-primary-60 py-5 px-6 d-flex justify-space-between align-center cursor-pointer preview"
    :class="{ 'border-b-md border-font-60': !isLastChat, shadow: isLastChat }"
    @click="$router.push(`/chats/${chat.id}`)"
  >
    <div class="d-flex">
      <div
        class="d-flex justify-center align-center user-initials font-subtitle font-weight-bold bg-secondary text-font-10 rounded-circle"
      >
        {{ receiver ? getUserInitials(receiver.name).toUpperCase() : "-" }}
      </div>
      <div class="ml-4">
        <div class="font-subtitle font-weight-bold">
          {{ receiver ? receiver.name : "-" }}
        </div>
        <div class="font-normal text-font-60">
          {{
            chat.last_message.sender_id === userStore.currentUser!.id
              ? "Você"
              : receiver
              ? receiver.name
              : "-"
          }}: <span class="text-truncate">{{ chat.last_message.content }}</span>
        </div>
      </div>
    </div>
    <v-icon size="28" color="primary">mdi-chevron-right</v-icon>
  </div>
</template>

<script setup lang="ts">
import type { Chat } from "~/interfaces/chat";

const componentProps = defineProps<{ chat: Chat; isLastChat: boolean }>();
const userStore = useUserStore();
const receiver = componentProps.chat.users.find(
  (user) => user.id !== userStore.currentUser?.id
);
</script>

<style scoped>
.user-initials {
  height: 50px;
  width: 50px;
}

.text-truncate {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.preview:hover {
  background-color: rgb(240, 240, 240) !important;
  transition: background-color 0.1s ease-in-out;
}

.shadow {
  box-shadow: 0px 1.5px 1.5px 0px rgba(160, 160, 160, 0.58);
}
</style>

<template>
  <div
    v-if="receiver"
    class="bg-primary-60 py-5 px-6 d-flex justify-space-between align-center cursor-pointer preview"
    :class="{ 'border-b-md border-font-60': !isLastChat, shadow: isLastChat }"
    @click="$router.push(`/chats/${chat.chat_id}`)"
  >
    <div class="d-flex">
      <CommonUserInitials
        :username="receiver.name"
        :size="50"
        :font-size="20"
      />
      <div class="ml-4 d-flex flex-column justify-center">
        <div class="font-subtitle font-weight-bold">
          {{ receiver ? receiver.name : "-" }}
        </div>
        <div v-if="chat.last_message" class="font-normal text-font-60">
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
const receiver = ref<{ id: number; name: string }>();

onBeforeMount(async () => {
  const receiverId = componentProps.chat.users.find(
    (userId) => userId !== userStore.currentUser?.id
  )!;
  const response = await userStore.getClientById(receiverId);
  if (response) {
    receiver.value = { id: receiverId, name: response.username };
  }
});
</script>

<style scoped>
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

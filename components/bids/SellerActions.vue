<template>
  <div class="d-flex flex-column justify-center ga-1 h-100">
    <v-btn class="btn btn-primary" width="225" @click="createChatWithSeller">
      <template #prepend>
        <v-icon class="mr-2">mdi-message-outline</v-icon>
      </template>
      <div>Falar com vendedor</div>
    </v-btn>
    <SellerReviewDialog :seller-id="sellerId" :is-enabled="true"/>
  </div>
</template>

<script setup lang="ts">
import SellerReviewDialog from "./SellerReviewDialog.vue";

const componentProps = defineProps<{ sellerId: number }>();
const router = useRouter();
const chatsStore = useChatsStore();
const userStore = useUserStore();

async function createChatWithSeller() {
  let chatId;
  await chatsStore.getChatsByUserId(userStore.currentUser!.id!);
  const chat = chatsStore.chats.find((chat) =>
    chat.users.includes(componentProps.sellerId)
  );
  if (chat === undefined) {
    const newChat = await chatsStore.addChat([
      componentProps.sellerId,
      userStore.currentUser!.id!,
    ]);
    if (newChat) {
      chatId = newChat?.chat_id;
    }
  } else {
    chatId = chat.chat_id;
  }

  if (chatId !== undefined) {
    router.push(`/chats/${chatId}`);
  }
}
</script>

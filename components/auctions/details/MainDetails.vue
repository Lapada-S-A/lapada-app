<template>
  <div>
    <div class="text-primary font-weight-bold font-title mb-1">
      {{ auctionType }}
    </div>
    <div
      class="font-weight-bold text-font-100 font-bigtitle line-height-normal mb-1"
    >
      {{ title }}
    </div>
    <div class="text-font-60 font-small mb-2">{{ category }}</div>
    <div class="text-font-100">{{ date }}</div>
    <v-row class="mt-2">
      <v-col cols="12">
        <div class="font-weight-semibold text-primary">Lance atual</div>
        <div class="text-bid text-font-100 font-weight-bold ml-n1 mt-n3">
          {{ currentBid }}
        </div>
        <div class="text-font-60 mt-n1">
          Incremento mín.: {{ minIncrement }}
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center mt-4 mb-5">
        <div v-if="isAuctionOpen">
          <CreateBidDialog
            v-if="!isSeller"
            :auction-id="auctionId"
            :buyer-id="currentUser?.id ?? 0"
            :disabled="isCurrentUserBidder"
            @created-bid="refreshAuctionDetails"
          />
          <DualButton
            v-else
            :left-button-text="leftButtonText"
            :right-button-text="rightButtonText"
            :right-button-disabled="!hasBids"
            @left-click="confirmAction(leftClickActions, leftButtonText)"
            @right-click="confirmAction(rightClickActions, rightButtonText)"
          />
        </div>

        <div v-else>
          <div v-if="!isCuratorPendingApproval">
            <v-btn
              v-if="isSeller && isAuctionFinished && hasBids"
              id="open-buyer-chat-btn"
              class="btn btn-primary font-title"
              height="65"
              width="320"
              color="primary"
              elevation="1"
              @click="createChatWithBuyer"
            >
              Falar com comprador
            </v-btn>
            <div
              v-else
              class="my-8 font-bigtitle text-font-60 font-weight-semibold"
            >
              {{ message }}
            </div>
          </div>
          <div v-if="isCuratorPendingApproval">
            <DualButton
              :left-button-text="leftButtonText"
              :right-button-text="rightButtonText"
              :right-button-color="'success'"
              @left-click="confirmAction(leftClickActions, leftButtonText)"
              @right-click="confirmAction(rightClickActions, rightButtonText)"
            />
          </div>
        </div>
      </v-col>
    </v-row>

    <ConfirmationDialog
      v-model="showConfirmDialog"
      :text="'Tem certeza que deseja '"
      :highlight="actionText.toLowerCase() + ' este leilão'"
      @confirm="executeConfirmedAction"
    />
  </div>
</template>

<script setup lang="ts">
import CreateBidDialog from "@/components/auctions/details/CreateBidDialog.vue";
import ConfirmationDialog from "~/components/common/ConfirmationDialog.vue";
import DualButton from "~/components/common/DualButton.vue";
import { AuctionStatus, UserTypes } from "~/stores/enum";

const props = defineProps({
  title: { type: String, required: true },
  auctionType: { type: String, default: "Leilão Comum" },
  category: { type: String, required: true },
  date: { type: String, required: true },
  currentBid: { type: String, required: true },
  currentBidBuyerId: { type: Number, required: true },
  minIncrement: { type: String, required: true },
  auctionId: { type: Number, required: true },
  auctionStatus: { type: Number, required: true },
  isSeller: { type: Boolean, required: true },
  hasBids: { type: Boolean, required: true },
});

const emits = defineEmits(["refresh-auction-details"]);

const currentBid = ref<string>(props.currentBid);
const auctionStatus = ref<AuctionStatus>(props.auctionStatus);
const { currentBidBuyerId, isSeller, hasBids } = toRefs(props);
const router = useRouter();

const userStore = useUserStore();
const auctionStore = useAuctionsStore();
const snackbarStore = useSnackbarStore();
const chatsStore = useChatsStore();
const currentUser = userStore.currentUser;

const leftButtonText = computed(() => {
  if (currentUser?.type_user === UserTypes.Curator) return "Rejeitar";
  if (currentUser?.type_user === UserTypes.Seller) return "Cancelar";
  return "Cancelar";
});

const rightButtonText = computed(() => {
  if (currentUser?.type_user === UserTypes.Curator) return "Aprovar";
  if (currentUser?.type_user === UserTypes.Seller) return "Encerrar";
  return "Encerrar";
});

const showConfirmDialog = ref(false);
const actionToExecute = ref<(() => Promise<void>) | null>(null);
const actionText = ref("");

const confirmAction = (action: () => Promise<void>, text: string) => {
  actionToExecute.value = action;
  actionText.value = text;
  showConfirmDialog.value = true;
};

const executeConfirmedAction = async () => {
  if (actionToExecute.value) {
    await actionToExecute.value();
    emits("refresh-auction-details", auctionStatus.value);
  }
};

const leftClickActions = async () => {
  if (!currentUser || !props.auctionId) return;
  let response;
  let message: string = "";

  if (currentUser.type_user === UserTypes.Curator) {
    response = await auctionStore.rejectAuction(props.auctionId);
    router.push("/proposals");
    message = "O leilão foi rejeitado.";
  } else if (currentUser.type_user === UserTypes.Seller) {
    response = await auctionStore.cancelAuction(props.auctionId);
    auctionStatus.value = AuctionStatus.CANCELED;
    message = "O leilão foi cancelado.";
  }

  if (response) {
    snackbarStore.showSnackbar("error", message);
  }
};

const rightClickActions = async () => {
  if (!currentUser || !props.auctionId) return;
  let response;
  let message: string = "";

  if (currentUser.type_user === UserTypes.Curator) {
    response = await auctionStore.approveAuction(props.auctionId);
    router.push("/proposals");
    message = "O leilão foi aprovado.";
  } else if (currentUser.type_user === UserTypes.Seller) {
    response = await auctionStore.finishAuction(props.auctionId);
    auctionStatus.value = AuctionStatus.FINISHED;
    message = "O leilão foi encerrado.";
  }

  if (response) {
    snackbarStore.showSnackbar("success", message);
  }
};

const refreshAuctionDetails = async () => {
  try {
    const updatedAuction = await auctionStore.getAuctionById(props.auctionId);
    if (updatedAuction) {
      const bidValue = updatedAuction.auction.highest_bid ?? 0;
      currentBid.value = `R$ ${bidValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
      emits("refresh-auction-details", auctionStatus.value);
    }
  } catch (error) {
    console.error("Erro ao atualizar detalhes do leilão:", error);
  }
};

const isAuctionOpen = computed(
  () => auctionStatus.value === AuctionStatus.OPEN
);
const isAuctionFinished = computed(
  () => auctionStatus.value === AuctionStatus.FINISHED
);
const isCuratorPendingApproval = computed(
  () =>
    auctionStatus.value === AuctionStatus.PENDING &&
    currentUser?.type_user === UserTypes.Curator
);
const isCurrentUserBidder = computed(
  () => currentBidBuyerId.value === currentUser?.id
);

const message = computed(() => {
  switch (auctionStatus.value) {
    case AuctionStatus.PENDING:
      return "Este leilão ainda não foi aprovado.";
    case AuctionStatus.FINISHED:
      return "Este leilão foi encerrado.";
    case AuctionStatus.CANCELED:
      return "Este leilão foi cancelado.";
    case AuctionStatus.REJECTED:
      return "Este leilão foi rejeitado.";
    default:
      return "";
  }
});

async function createChatWithBuyer() {
  let chatId;
  await chatsStore.getChatsByUserId(userStore.currentUser!.id!);
  const chat = chatsStore.chats.find((chat) =>
    chat.users.includes(currentBidBuyerId.value)
  );
  if (chat === undefined) {
    const newChat = await chatsStore.addChat([
      currentBidBuyerId.value,
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

<style scoped>
.text-bid {
  font-size: 4.5rem;
}

.button-custom {
  width: 350px;
  height: 70px !important;
}

.line-height-normal {
  line-height: 36px;
}
</style>

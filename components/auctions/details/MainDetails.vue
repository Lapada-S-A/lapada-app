<template>
  <div>
    <div class="text-primary font-weight-bold font-title mb-1">
      {{ auctionType }}
    </div>
    <div class="font-weight-bold text-font-100 font-bigtitle">{{ title }}</div>
    <div class="text-font-60 font-small mb-1">{{ category }}</div>
    <div class="text-font-100">{{ date }}</div>
    <v-row class="mt-1">
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
        <CreateBidDialog
          v-if="!isSeller && currentUser?.id !== UserTypes.Curator"
          :auction-id="auctionId"
          :buyer-id="currentUser?.id ?? 0"
          :disabled="currentBidBuyerId === currentUser?.id"
          @created-bid="refreshAuctionDetails"
        />
        <DualButton
          v-else
          :left-button-text="leftButtonText"
          :right-button-text="rightButtonText"
          @left-click="confirmAction(leftClickActions, leftButtonText)"
          @right-click="confirmAction(rightClickActions, rightButtonText)"
        />
      </v-col>
    </v-row>

    <ConfirmationDialog
      v-model="showConfirmDialog"
      :text="'Tem certeza que deseja '"
      :highlight="actionText"
      @confirm="executeConfirmedAction"
    />
  </div>
</template>

<script setup lang="ts">
import CreateBidDialog from "@/components/auctions/details/CreateBidDialog.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import ConfirmationDialog from "~/components/common/ConfirmationDialog.vue";
import DualButton from "~/components/common/DualButton.vue";

const props = defineProps({
  title: { type: String, required: true },
  auctionType: { type: String, default: "Leilão Comum" },
  category: { type: String, required: true },
  date: { type: String, required: true },
  currentBid: { type: String, required: true },
  currentBidBuyerId: { type: Number, required: true },
  minIncrement: { type: String, required: true },
  auctionId: { type: Number, required: true },
  isSeller: { type: Boolean, required: true },
});

const emits = defineEmits(["refresh-auction-details"]);

const currentBid = ref<string>(props.currentBid);
const { currentBidBuyerId, isSeller } = toRefs(props);

const userStore = useUserStore();
const auctionStore = useAuctionsStore();
const currentUser = userStore.currentUser;

const leftButtonText = computed(() => {
  if (currentUser?.type_user === 3) return "Aprovar";
  if (currentUser?.type_user === 2) return "Cancelar";
  return "Cancelar";
});

const rightButtonText = computed(() => {
  if (currentUser?.type_user === 3) return "Rejeitar";
  if (currentUser?.type_user === 2) return "Encerrar";
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
  }
};

const leftClickActions = async () => {
  if (!currentUser || !props.auctionId) return;

  if (currentUser.type_user === 3) {
    //ainda sem comportamento definido
    await auctionStore.changeStatusOfAuction(props.auctionId, "open");
  } else if (currentUser.type_user === 2) {
    await auctionStore.changeStatusOfAuction(props.auctionId, "cancel");
  }
};

const rightClickActions = async () => {
  if (!currentUser || !props.auctionId) return;

  if (currentUser.type_user === 3) {
    await auctionStore.changeStatusOfAuction(props.auctionId, "reject");
  } else if (currentUser.type_user === 2) {
    await auctionStore.changeStatusOfAuction(props.auctionId, "finish");
  }
};

const refreshAuctionDetails = async () => {
  try {
    const updatedAuction = await auctionStore.getAuctionById(props.auctionId);
    if (updatedAuction) {
      const bidValue = updatedAuction.highest_bid ?? 0;
      currentBid.value = `R$ ${bidValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
      emits("refresh-auction-details");
    }
  } catch (error) {
    console.error("Erro ao atualizar detalhes do leilão:", error);
  }
};
</script>

<style scoped>
.text-bid {
  font-size: 4.5rem;
}

.button-custom {
  width: 350px;
  height: 70px !important;
}
</style>

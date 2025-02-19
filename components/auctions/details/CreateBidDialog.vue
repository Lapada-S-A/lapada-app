<template>
  <v-dialog v-model="isDialogOpen" opacity="0.4" max-width="500" persistent>
    <template #activator="{ props: activatorProps }">
      <v-btn
        id="open-create-bid-dialog-btn"
        v-bind="activatorProps"
        class="btn btn-primary font-title"
        :class="{ 'btn-disabled': props.disabled }"
        height="65"
        width="320"
        color="primary"
        elevation="1"
        @click="openDialog"
      >
        Fazer lance
      </v-btn>
    </template>

    <template #default>
      <v-card class="rounded-lg pa-4">
        <div>
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="font-subtitle font-weight-bold">Fazer Lance</div>
            <v-btn
              id="close-filter-button"
              class="rounded-xl"
              variant="plain"
              :ripple="false"
              size="22"
              @click="closeDialog"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-card-title>
        </div>

        <v-card-text class="px-4 py-4">
          <div class="font-weight-medium mb-2">Valor (R$)</div>
          <v-text-field
            v-model="bid"
            placeholder="Valor"
            type="number"
            hide-spin-buttons
            :rules="bidRules"
            :error-messages="errorMessage"
          />
        </v-card-text>

        <v-card-actions class="px-4">
          <v-spacer />

          <v-btn
            class="btn btn-primary px-6 ml-2"
            :disabled="!isBidValid"
            @click="submitBid"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { useAuctionsStore } from "@/stores/auctions";
import { useBidsStore } from "@/stores/bids";
import { computed, ref } from "vue";

const props = defineProps({
  auctionId: { type: Number, required: true },
  buyerId: { type: Number, required: true },
  disabled: { type: Boolean, required: true },
});

const emit = defineEmits(["created-bid"]);

const bid = ref<number | null>(null);
const errorMessage = ref<string>("");
const isDialogOpen = ref(false);

const bidsStore = useBidsStore();
const auctionStore = useAuctionsStore();
const snackBarStore = useSnackbarStore();

const auction = ref(await auctionStore.getAuctionById(props.auctionId));

const fetchAuction = async () => {
  auction.value = await auctionStore.getAuctionById(props.auctionId);
};

const bidRules = computed(() => [
  (value: number) => {
    if (!value) return "O valor do lance é obrigatório.";
    if (value <= 0) return "O valor do lance deve ser maior que zero.";

    if (auction.value) {
      const highestBid =
        auction.value.highest_bid ?? auction.value.initial_value;
      const minIncrement = auction.value.min_increment ?? 0;

      if (value <= highestBid)
        return "O valor do lance deve ser maior que o lance atual.";

      if (value < highestBid + minIncrement)
        return `O valor do lance deve ser pelo menos R$ ${(
          highestBid + minIncrement
        ).toFixed(2)}.`;
    }

    return true;
  },
]);

const isBidValid = computed(() => {
  if (!bid.value) return false;
  return bidRules.value.every((rule) => rule(bid.value as number) === true);
});

const resetBid = () => {
  bid.value = null;
  errorMessage.value = "";
};

const openDialog = async () => {
  await fetchAuction();
  resetBid();
  isDialogOpen.value = true;
};

const closeDialog = () => {
  resetBid();
  isDialogOpen.value = false;
};

const submitBid = async () => {
  if (!bid.value || !auction.value) return;

  const highestBid = auction.value.highest_bid ?? 0;
  const minIncrement = auction.value.min_increment ?? 0;
  const minValidBid = highestBid + minIncrement;

  if (bid.value < minValidBid) {
    errorMessage.value = `O valor do lance deve ser pelo menos R$ ${minValidBid.toFixed(
      2
    )}.`;
    return;
  }

  const userBid = {
    amount: parseFloat(bid.value!.toString()),
    auction_id: props.auctionId,
    buyer_id: props.buyerId,
  };

  try {
    await bidsStore.createBid(userBid);
    resetBid();
    emit("created-bid", bid.value);
    snackBarStore.showSnackbar(
      "success",
      "Lance feito com sucesso!"
    );
  } catch {
    snackBarStore.showSnackbar(
      "error",
      "Erro ao fazer um lance. Tente novamente."
    );
  }
  closeDialog();
};
</script>

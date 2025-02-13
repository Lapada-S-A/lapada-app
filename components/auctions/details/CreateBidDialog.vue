<template>
  <v-dialog opacity="0.4" max-width="500" persistent>
    <template #activator="{ props: activatorProps }">
      <v-btn
        id="open-create-bid-dialog-btn"
        v-bind="activatorProps"
        class="btn btn-primary font-subtitle"
        height="65"
        width="320"
        color="primary"
      >
        Fazer lance
      </v-btn>
    </template>

    <template #default="{ isActive }">
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
              @click="[(isActive.value = false), resetBid()]"
              ><v-icon> mdi-close</v-icon></v-btn
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
            @click="[(isActive.value = false), createBid()]"
            >Confirmar</v-btn
          >
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
});

const emit = defineEmits(["created-bid"]);

const bid = ref<number | null>();
const errorMessage = ref<string>("");
const bidsStore = useBidsStore();
const auctionStore = useAuctionsStore();

const auction = await auctionStore.getAuctionById(props.auctionId);

const bidRules = computed(() => [
  (value: number) => {
    if (!value) return "O valor do lance é obrigatório.";
    if (value <= 0) return "O valor do lance deve ser maior que zero.";
    if (
      auction &&
      auction.highest_bid !== undefined &&
      auction.highest_bid >= value
    ) {
      return "O valor do lance deve ser maior que o lance atual.";
    }
    return true;
  },
]);

const isBidValid = computed(() => {
  if (!bid.value) return false;

  return (
    bid.value !== null &&
    bidRules.value.every((rule) => rule(bid.value as number) === true)
  );
});

const resetBid = () => {
  bid.value = null;
  errorMessage.value = "";
};

const createBid = async () => {
  if (!bid.value) return;

  if (
    auction &&
    auction.highest_bid !== undefined &&
    auction.highest_bid >= bid.value
  ) {
    errorMessage.value = "O valor do lance deve ser maior que o lance atual.";
    return;
  }

  const userBid = {
    amount: bid.value,
    auction_id: props.auctionId,
    buyer_id: props.buyerId,
  };

  try {
    await bidsStore.createBid(userBid);
    resetBid();
    emit("created-bid", bid.value);
  } catch (error) {
    console.error("Erro ao criar lance:", error);
    errorMessage.value = "Erro ao criar lance. Tente novamente.";
  }
};
</script>

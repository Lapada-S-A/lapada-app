<template>
  <v-dialog opacity="0.4" max-width="500" persistent>
    <template #activator="{ props: activatorProps }">
      <div>
        <v-btn
          class="btn btn-secondary"
          :class="{ 'btn-disabled': !isEnabled }"
          width="225"
          v-bind="activatorProps"
        >
          <template #prepend>
            <v-icon class="mr-2">mdi-star</v-icon>
          </template>
          <div>Avaliar vendedor</div>
        </v-btn>
        <v-tooltip v-if="!isEnabled" activator="parent">
          Você já avaliou esse vendedor
        </v-tooltip>
      </div>
    </template>

    <template #default="{ isActive }">
      <v-card class="rounded-lg pa-4">
        <div>
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="font-subtitle font-weight-bold">Avaliar Vendedor</div>
            <v-btn
              id="close-filter-button"
              class="rounded-xl"
              variant="plain"
              :ripple="false"
              size="22"
              @click="isActive.value = false"
              ><v-icon> mdi-close</v-icon></v-btn
            >
          </v-card-title>
        </div>

        <v-card-text class="px-4 py-2">
          <div class="font-normal text-font-60">
            *A avaliação deve ser feita com base na sua experiência com o
            vendedor após ganhar o leilão
          </div>

          <div class="d-flex justify-space-around py-4 text-warning">
            <v-icon
              v-for="starIndex in 5"
              :key="starIndex"
              :size="55"
              @click="setRating(starIndex)"
              @mouseenter="hoverRating = starIndex"
              @mouseleave="hoverRating = 0"
              >{{
                rating >= starIndex || hoverRating >= starIndex
                  ? "mdi-star"
                  : "mdi-star-outline"
              }}</v-icon
            >
          </div>
        </v-card-text>

        <v-card-actions class="px-4">
          <v-spacer />

          <v-btn
            class="btn btn-primary px-6 ml-2"
            @click="
              isActive.value = false;
              sendReview();
            "
            >Confirmar</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["review"]);
const componentProps = defineProps<{
  sellerId: number;
  auctionId: number;
}>();
const userStore = useUserStore();
const reviewStore = useReviewStore();
const snackbarStore = useSnackbarStore();
const rating = ref(0);
const hoverRating = ref(0);
const isEnabled = ref<boolean>(true);

onMounted(async () => {
  const response = await reviewStore.getReviewOfAuction(
    componentProps.auctionId
  );
  if (response && Object.keys(response).length > 0) {
    isEnabled.value = false;
  }
});

const setRating = (starIndex: number) => {
  rating.value = starIndex;
};

const sendReview = async () => {
  const response = await reviewStore.createReview({
    rate: rating.value,
    comment: "",
    buyer_id: userStore.currentUser!.id!,
    seller_id: componentProps.sellerId,
    auction_id: componentProps.auctionId,
  });
  if (response)
    snackbarStore.showSnackbar(
      "success",
      "Avaliação de vendedor enviada com successo!"
    );
  isEnabled.value = false;
  emit("review");
};
</script>

<style scoped>
.mdi-star,
.mdi-star-outline {
  transition: color 0.3s ease;
}
</style>

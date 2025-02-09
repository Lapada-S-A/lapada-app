<template>
  <MainCard>
    <div class="pa-4">
      <div class="mb-10">
        <Specification
          v-model:specification="specification"
          v-model:validation="specificationValidation"
          :validate="validate"
        />

        <ImagesUpload
          v-model:validation="imagesValidation"
          :validate="validate"
        />
      </div>

      <div class="d-flex justify-end ga-2">
        <v-btn
          class="btn btn-secondary"
          height="37"
          width="120"
          @click="$router.push('/auctions/my-auctions')"
          >Cancelar</v-btn
        >
        <v-btn
          class="btn btn-primary"
          height="37"
          width="120"
          @click="submitForm"
          >Salvar</v-btn
        >
      </div>
    </div>
  </MainCard>
</template>

<script setup lang="ts">
import MainCard from "~/components/common/MainCard.vue";
import Specification from "./Specification.vue";
import ImagesUpload from "./ImagesUpload.vue";
import type { Auction, AuctionSpecification } from "~/interfaces/auction";
import { AuctionStatus } from "~/stores/enum";

const router = useRouter();
const auctionStore = useAuctionsStore();
const auction = ref<Auction>({
  title: "",
  description: "",
  end_date: "",
  type_id: 1,
  category_ids: [],
  min_increment: 0,
  initial_value: 0,
  seller_id: 1,
  status: AuctionStatus.PENDING,
});
const validate = ref<boolean>(false);
const specificationValidation = ref<boolean>(false);
const specification = ref<AuctionSpecification>();
const imagesValidation = ref<boolean>(false);

function submitForm() {
  validate.value = false;
  nextTick(async () => {
    validate.value = true;

    if (specificationValidation.value && imagesValidation.value) {
      console.log(specification.value);
      updateAuctionSpecification();
      if (await auctionStore.addAuction(auction.value)) {
        router.push("/auctions/my-auctions");
      }
    }
  });
}

function updateAuctionSpecification() {
  if (specification.value) {
    auction.value.title = specification.value.title!;
    auction.value.description = specification.value.description!;
    auction.value.min_increment = specification.value.min_increment!;
    auction.value.category_ids = specification.value.category_ids!;
    auction.value.type_id = specification.value.type_id!;
    auction.value.end_date = specification.value.end_date!;
  }
}
</script>

<style scoped>
:deep(.v-field__append-inner > .v-icon),
:deep(.v-file-upload-icon) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
  cursor: pointer;
}
</style>

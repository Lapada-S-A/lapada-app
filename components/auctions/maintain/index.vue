<template>
  <MainCard v-if="auction">
    <div class="pa-4">
      <div class="mb-10">
        <Specification
          v-model:specification="specification"
          v-model:validation="specificationValidation"
          :validate="validate"
          :auction="auction"
          :edit="edit"
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
          @click="changeValidate"
          >Salvar</v-btn
        >
      </div>
    </div>
  </MainCard>
  <div v-else>
    <div class="d-flex justify-center mt-16">
      <div
        class="d-flex flex-column align-center justify-center pa-6 mt-8"
        max-width="400"
      >
        <v-icon size="125" color="secondary">mdi-shopping-outline</v-icon>
        <div
          class="mt-4 font-subtitle font-weight-semibold text-secondary text-center"
        >
          Ops... <span class="ml-2">Este leilão não foi encontrado</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainCard from "~/components/common/MainCard.vue";
import Specification from "./Specification.vue";
import ImagesUpload from "./ImagesUpload.vue";
import type { Auction, AuctionSpecification } from "~/interfaces/auction";

const componentProps = defineProps<{ edit: boolean; auction?: Auction }>();
const router = useRouter();
const auctionStore = useAuctionsStore();
const snackBarStore = useSnackbarStore();
const auction = toRef(componentProps.auction);
const validate = ref<boolean>(false);
const specificationValidation = ref<boolean>(false);
const specification = ref<AuctionSpecification>();
const imagesValidation = ref<boolean>(false);

const isFormValidated = computed(() => {
  return specificationValidation.value && imagesValidation.value;
});

watch(
  () => isFormValidated.value,
  async () => {
    if (isFormValidated.value) {
      await submitForm();
    }
  }
);

async function submitForm() {
  let result = false;
  updateAuctionSpecification();
  if (auction.value) {
    let response;
    let message = "";
    if (!componentProps.edit) {
      response = await auctionStore.addAuction(auction.value);
      if (response) {
        message = "Leilão criado com sucesso!";
        result = true;
      }
    } else {
      response = await auctionStore.updateAuction(auction.value);
      if (response) {
        message = "Leilão atualizado com sucesso!";
        result = true;
      }
    }
    if (result) {
      snackBarStore.showSnackbar("success", message);
      router.push("/auctions/my-auctions");
    }
  }
}

function changeValidate() {
  specificationValidation.value = false;
  imagesValidation.value = false;
  validate.value = true;
  nextTick(() => {
    validate.value = false;
  });
}

function updateAuctionSpecification() {
  if (auction.value && specification.value) {
    auction.value.title = specification.value.title!;
    auction.value.description = specification.value.description!;
    auction.value.min_increment = specification.value.min_increment!;
    auction.value.initial_value = specification.value.initial_value!;
    auction.value.categories = specification.value.categories!;
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

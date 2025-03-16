<template>
  <div>
    <v-card width="270" height="380" class="pa-7 d-flex flex-column">
      <div class="font-large font-weight-bold mb-4 title-truncate">
        {{ auction.title }}
      </div>
      <v-img :src="auctionImage!" class="mb-3 rounded" height="155" cover>
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular color="font-60" indeterminate />
          </div>
        </template>
      </v-img>
      <div class="flex-grow-1">
        <div class="d-flex justify-space-between align-center">
          <div class="font-normal font-weight-semibold text-primary">
            {{ type ? type.name : "" }}
          </div>
          <v-btn
            id="send-to-details-btn"
            size="20"
            variant="text"
            @click="sentToDetails()"
          >
            <v-icon size="18" color="primary">mdi-open-in-new</v-icon>
          </v-btn>
        </div>
        <div
          v-if="showStatus"
          class="font-small font-weight-semibold status"
          :class="`text-${statusProperties.color}`"
        >
          {{ statusProperties.name }}
        </div>
      </div>

      <div
        v-if="!isCurator"
        class="d-flex justify-space-between font-small font-weight-bold"
      >
        <div class="d-flex align-center ga-1">
          <v-icon size="20" color="primary">mdi-clock-fast</v-icon>
          <div class="time">
            {{
              remainingTime > 0 && auction.status === AuctionStatus.OPEN
                ? formatSecondsToTimeString(remainingTime)
                : "---"
            }}
          </div>
        </div>
        <div
          class="d-flex align-center ga-1"
          :class="{ 'mr-2': auction.initial_value === 0 }"
        >
          <v-icon size="20" color="primary">mdi-cash-multiple</v-icon>
          <div class="text-truncate bid">
            {{
              auction.highest_bid! > 0 && auction.status === AuctionStatus.OPEN 
                ? formatCurrency(auction.highest_bid!)
                : "---"
            }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="d-flex align-center ga-1">
          <v-icon size="20" color="primary">mdi-account</v-icon>
          <div class="time font-weight-bold font-normal">
            {{ sellerName }}
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Auction, AuctionPhotosResponse } from "~/interfaces/auction";
import type { Type } from "~/interfaces/type";
import { Buffer } from "buffer";

const componentProps = defineProps<{
  auction: Auction;
  photo: AuctionPhotosResponse;
  showStatus?: boolean;
  isCurator?: boolean;
}>();
const userStore = useUserStore();
const typesStore = useTypesStore();
const router = useRouter();
const statusProperties = getAuctionStatusProperties(
  +componentProps.auction.status
);
const type = ref<Type>();
const remainingTime = ref<number>(0);
const sellerName = ref<string>("");

const sentToDetails = () => {
  router.push(`/auctions/${componentProps.auction.id}`);
};

function parseDateString(dateStr: string): Date {
  const [day, month, year, hour, minute, second] = dateStr
    .split("-")
    .map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
}

function calculateRemainingTime(startDate: string, endDate: string): number {
  const start = parseDateString(startDate).getTime();
  const end = parseDateString(endDate).getTime();
  return Math.floor((end - start) / 1000);
}

onMounted(async () => {
  type.value = typesStore.getTypeById(componentProps.auction.type_id);
  remainingTime.value = calculateRemainingTime(
    componentProps.auction.created_date!,
    componentProps.auction.end_date
  );
  const seller = await userStore.getClientById(
    componentProps.auction.seller_id
  );
  if (seller) {
    sellerName.value = seller?.username;
  }
});

const auctionImage = computed(() => {
  if (componentProps.photo) {
    const base64String = Buffer.from(
      componentProps.photo.pdfData.data as unknown as string,
      "binary"
    ).toString("base64");
    return `data:image/png;base64,${base64String}`;
  }
  return null;
});
</script>

<style scoped>
:deep(.v-card) {
  color: rgba(var(--v-theme-font-100));
}

.title-truncate {
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-clamp: 2;
  -webkit-line-clamp: 2;
}

.bid {
  max-width: 120px;
}
</style>

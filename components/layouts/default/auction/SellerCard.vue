<template>
  <div class="mt-5">
    <h4 class="font-weight-bold text-primary">Vendedor</h4>
    <v-row class="mt-1">
      <v-col cols="2" class="text-center">
        <v-avatar size="100" class="elevation-1 bg-primary">
          <span class="text-h3 font-weight-bold ml-1 mt-1">{{
            avatarInitials
          }}</span>
        </v-avatar>
      </v-col>
      <v-col cols="10" class="mt-5">
        <div class="d-flex flex-column text-font-100">
          <h3>{{ name }}</h3>
          <div class="d-flex align-items-center">
            <v-icon color="yellow">mdi-star</v-icon>
            <span class="ml-2 text-body-2 mt-1 font-weight-semibold">{{
              rating
            }}</span>
          </div>
          <p class="text-subtitle-2">
            +{{ auctionsCount }} leilões desde {{ since }}
          </p>
        </div>
      </v-col>
    </v-row>
    <p class="mt-2 text-caption text-font-60">
      *Operações de pagamento e logística devem ser acordadas entre as partes.
    </p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  auctionsCount: { type: Number, required: true },
  since: { type: Number, required: true },
});

const avatarInitials = computed(() => {
  return props.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});
</script>

<template>
  <v-col cols="12" class="text-center">
    <div class="font-weight-semibold text-primary mt-1">Tempo restante</div>
    <v-row justify="center">
      <v-col
        v-for="(unit, index) in timeUnits"
        :key="index"
        cols="auto"
        class="text-center mt-2 text-font-100 mx-2"
      >
        <div class="font-weight-bold font-bigtitle">{{ unit.value }}</div>
        <div class="font-weight-semibold mt-n2">{{ unit.label }}</div>
      </v-col>
    </v-row>
    <div class="mt-2 text-font-60 font-small">
      *Não serão aceitos lances após o fim desse prazo.
    </div>
  </v-col>
</template>
<script setup lang="ts">
defineProps({
  timeUnits: {
    type: Array as () => { value: number; label: string }[],
    required: true,
  },
});
</script>

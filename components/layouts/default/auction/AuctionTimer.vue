<template>
    <v-col cols="12" class="text-center">
      <p class="font-weight-bold text-primary text-body-1">Tempo restante</p>
      <v-row justify="center">
        <v-col
          v-for="(unit, index) in timeUnits"
          :key="index"
          cols="auto"
          class="text-center mt-3 text-font-100 mx-3"
        >
          <p class="font-weight-bold text-h3">{{ unit.value }}</p>
          <p class="text-h6">{{ unit.label }}</p>
        </v-col>
      </v-row>
      <p class="text-caption mt-2 text-font-60">
        *Não serão aceitos lances após o fim desse prazo.
      </p>
    </v-col>
</template>
<script setup lang="ts">
  const props = defineProps({
    timeUnits: {
      type: Array as () => { value: number; label: string }[],
      required: true,
    },
  });
</script>
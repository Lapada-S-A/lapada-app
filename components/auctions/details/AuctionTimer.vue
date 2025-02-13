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
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  remainingTime: { type: Number, required: true },
});

const timeUnits = ref([
  { value: 0, label: "dias" },
  { value: 0, label: "horas" },
  { value: 0, label: "minutos" },
  { value: 0, label: "segundos" },
]);

let timerInterval: ReturnType<typeof setInterval> | null = null;

const convertTime = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  timeUnits.value = [
    { value: days, label: "dias" },
    { value: hours, label: "horas" },
    { value: minutes, label: "minutos" },
    { value: seconds, label: "segundos" },
  ];
};

const startCountdown = () => {
  if (timerInterval) clearInterval(timerInterval);

  let remainingSeconds = props.remainingTime;
  if (isNaN(remainingSeconds) || remainingSeconds < 0) {
    timeUnits.value = [
      { value: 0, label: "dias" },
      { value: 0, label: "horas" },
      { value: 0, label: "minutos" },
      { value: 0, label: "segundos" },
    ];
    return;
  }

  convertTime(remainingSeconds);

  timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      convertTime(remainingSeconds);
    } else {
      clearInterval(timerInterval!);
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});

watch(() => props.remainingTime, startCountdown);

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

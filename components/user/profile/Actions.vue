<template>
  <div class="d-flex flex-column ga-2">
    <v-btn
      v-for="(button, index) in buttons"
      :key="index"
      :class="button.class"
      :height="button.height"
      :width="button.width"
      :prepend-icon="button.icon"
      @click="button.click"
    >
      {{ button.text }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/interfaces/user";

defineProps<{ user: User | null }>();
const buttons = ref([
  {
    class: "btn btn-primary",
    height: "37",
    width: "200",
    icon: "mdi-badge-account",
    text: "Tornar-se vendedor",
    click: () => console.log("cliquei em botao"),
  },
  {
    class: "btn btn-secondary",
    height: "37",
    width: "200",
    icon: "mdi-pencil-outline",
    text: "Alterar senha",
    click: () => console.log("cliquei em botao"),
  },
  {
    class: "btn btn-primary bg-error",
    height: "37",
    width: "200",
    icon: "mdi-delete-outline",
    text: "Apagar conta",
    click: () => console.log("cliquei em botao"),
  },
]);
</script>

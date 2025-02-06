<template>
  <div>
    <div class="text-primary font-weight-semibold font-subtitle mb-4">
      Tipo de Usuário
    </div>

    <v-radio-group v-model="userType">
      <div class="d-flex w-50">
        <v-radio
          label="Comprador/Vendedor"
          :value="UserTypes.Buyer"
          color="primary"
        />
        <v-radio label="Curador" :value="UserTypes.Curator" color="primary" />
      </div>
    </v-radio-group>
  </div>
</template>

<script setup lang="ts">
import { UserTypes } from "~/stores/enum";

const emit = defineEmits(["update:user-type-selected"]);
const userType = ref<UserTypes>(UserTypes.Buyer);

watch(
  () => userType.value,
  () => {
    emit("update:user-type-selected", userType.value);
  }
);
</script>

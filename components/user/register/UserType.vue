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
        <v-radio
          label="Curador"
          :value="UserTypes.Curator"
          color="primary"
          @click="openCuratorDialog"
        />
      </div>
    </v-radio-group>

    <CuratorDialog
      v-model="curatorDialog"
      @confirmed="confirmCuratorSelection"
    />
  </div>
</template>

<script setup lang="ts">
import { UserTypes } from "~/stores/enum";
import CuratorDialog from "@/components/user/CuratorDialog.vue";

const emit = defineEmits(["update:user-type-selected"]);

const userType = ref<UserTypes>(UserTypes.Buyer);
const curatorDialog = ref(false);
const infosUploaded = ref(false);

function openCuratorDialog() {
  if (!infosUploaded.value) {
    curatorDialog.value = true;
  } else {
    emit("update:user-type-selected", userType);
  }
}

function confirmCuratorSelection() {
  curatorDialog.value = false;
  infosUploaded.value = true;
  emit("update:user-type-selected", UserTypes.Curator);
}
</script>

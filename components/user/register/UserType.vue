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
      :info-uploaded="infosUploaded"
      :register="true"
      @confirmed="confirmCuratorSelection"
    />
  </div>
</template>

<script setup lang="ts">
import { UserTypes } from "~/stores/enum";
import CuratorDialog from "@/components/user/CuratorDialog.vue";
import type { CuratorInfo } from "~/interfaces/user";

const emit = defineEmits(["update:user-type-selected", "update:curator-info"]);

const userType = ref<UserTypes>(UserTypes.Buyer);
const curatorInfo = ref<CuratorInfo>();
const curatorDialog = ref(false);
const infosUploaded = ref(false);

function openCuratorDialog() {
  curatorDialog.value = true;
}

function confirmCuratorSelection(info: CuratorInfo) {
  curatorDialog.value = false;
  infosUploaded.value = true;
  curatorInfo.value = info;
  emit("update:user-type-selected", UserTypes.Curator);
  emit("update:curator-info", curatorInfo.value);
}

watch(
  () => curatorDialog.value,
  (val) => {
    if (!val && !infosUploaded.value) {
      userType.value = UserTypes.Buyer;
    }
  }
);
</script>

<template>
  <CommonUserInitials :username="user!.username" :size="200" :font-size="90" />
  <div class="mt-4 mb-8 d-flex flex-column justify-center">
    <div class="font-title font-weight-bold text-center">
      {{ user ? user.username : "" }}
    </div>
    <div class="font-large text-font-60">
      cadastro em: {{ formatDatePickerDate(user ? user.created_at! : "") }}
    </div>
    <div v-if="userType" class="text-primary text-center font-weight-bold mt-1">
      {{ userType }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/interfaces/user";
import { UserTypes } from "~/stores/enum";

const props = defineProps<{ user: User | null }>();

const userType = computed(() => {
  switch (props.user?.type_user) {
    case UserTypes.Seller:
      return "Vendedor";
    case UserTypes.Curator:
      return "Curador";
    case UserTypes.Administrator:
      return "Administrador";
    default:
      return "";
  }
});
</script>

<style scoped>
.seller-initials {
  width: 200px;
  height: 200px;
  font-size: 90px;
}
</style>

<template>
  <div class="d-flex flex-column ga-2">
    <v-btn
      v-for="(button, index) in buttons"
      :key="index"
      :class="[button.class, { 'btn-disabled': button.disabled }]"
      :height="button.height"
      :width="button.width"
      :prepend-icon="button.icon"
      @click="button.click"
    >
      {{ button.text }}
    </v-btn>
    <ChangePasswordDialog v-model="changePasswordDialog" />

    <PromoteToSellerDialog
      v-model="promoterToSellerDialog"
      @confirmed="promoterToSeller()"
    />

    <CommonConfirmationDialog
      v-model="confirmDeleteAccount"
      text="Você tem certeza que deseja"
      highlight="apagar sua conta"
      @confirm="deleteAccount"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/interfaces/user";
import ChangePasswordDialog from "./ChangePasswordDialog.vue";
import PromoteToSellerDialog from "./PromoteToSellerDialog.vue";
import { UserTypes } from "~/stores/enum";

const userStore = useUserStore();
const changePasswordDialog = ref<boolean>(false);
const promoterToSellerDialog = ref<boolean>(false);
const confirmDeleteAccount = ref<boolean>(false);
const router = useRouter();

const props = defineProps<{ user: User | null }>();

const buttons = ref([
  {
    class: "btn btn-primary",
    height: "37",
    width: "200",
    icon: "mdi-badge-account",
    text: "Tornar-se vendedor",
    disabled: userStore.currentUser?.type_user !== UserTypes.Buyer,
    click: () => {
      promoterToSellerDialog.value = true;
    },
  },
  {
    class: "btn btn-secondary",
    height: "37",
    width: "200",
    icon: "mdi-pencil-outline",
    text: "Alterar senha",
    disabled: false,
    click: () => {
      changePasswordDialog.value = true;
    },
  },
  {
    class: "btn btn-primary bg-error",
    height: "37",
    width: "200",
    icon: "mdi-delete-outline",
    text: "Apagar conta",
    disabled: false,
    click: () => (confirmDeleteAccount.value = true),
  },
]);

function deleteAccount() {
  if (props.user?.id) {
    userStore.deleteAccount(props.user!.id!);
  }
}

function promoterToSeller() {
  if (props.user?.id) {
    userStore.promoterToSeller(props.user.id);
    userStore.getUserById(props.user.id);
    useSnackbarStore().showSnackbar("success", "Você agora é um vendedor!");
    router.push("/");
  }
}
</script>

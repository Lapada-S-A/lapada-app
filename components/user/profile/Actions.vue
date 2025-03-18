<template>
  <div class="d-flex flex-column ga-2">
    <div v-for="(button, index) in buttons" :key="index">
      <div>
        <v-btn
          v-if="button.show"
          :class="button.class + `${button.disabled ? ' btn-disabled' : ''}`"
          :height="button.height"
          :width="button.width"
          :prepend-icon="button.icon"
          @click="button.click"
        >
          {{ button.text }}
        </v-btn>
        <v-tooltip v-if="button.disabled" activator="parent">
          {{ button.disabledTooltip }}
        </v-tooltip>
      </div>
    </div>
    <ChangePasswordDialog v-model="changePasswordDialog" />

    <PromoteToSellerDialog
      v-model="promoterToSellerDialog"
      @confirmed="promoterToSeller"
    />

    <CuratorDialog
      v-model="curatorDialog"
      :info-uploaded="false"
      :register="false"
      @confirmed="addSubmission"
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
import CuratorDialog from "../CuratorDialog.vue";

const userStore = useUserStore();
const submissionsStore = useSubmissionsStore();
const promotionsStore = usePromotionsStore();
const snackBarStore = useSnackbarStore();
const changePasswordDialog = ref<boolean>(false);
const promoterToSellerDialog = ref<boolean>(false);
const curatorDialog = ref<boolean>(false);
const confirmDeleteAccount = ref<boolean>(false);
const hasPendingPromotion = ref<boolean>(false);

const props = defineProps<{ user: User | null }>();

onMounted(async () => {
  if (props.user?.type_user === UserTypes.Buyer) {
    const response = await promotionsStore.getUserPromotion(props.user!.id!);
    if (response && response.length > 0) {
      hasPendingPromotion.value = true;
    }
  }
});

const buttons = computed(() => {
  return [
    {
      class: "btn btn-primary",
      height: "37",
      width: "200",
      icon: "mdi-badge-account",
      text:
        props.user?.type_user === UserTypes.Buyer
          ? "Tornar-se vendedor"
          : "Adicionar categoria",
      disabled:
        props.user?.type_user === UserTypes.Buyer && hasPendingPromotion.value,
      disabledTooltip: "Você já enviou uma submissão para análise.",
      show:
        props.user?.type_user === UserTypes.Buyer ||
        props.user?.type_user === UserTypes.Curator,
      click:
        props.user?.type_user === UserTypes.Buyer
          ? () => {
              promoterToSellerDialog.value = true;
            }
          : () => {
              curatorDialog.value = true;
            },
    },
    {
      class: "btn btn-secondary",
      height: "37",
      width: "200",
      icon: "mdi-pencil-outline",
      text: "Alterar senha",
      disabled: false,
      disabledTooltip: "",
      show: true,
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
      disabledTooltip: "",
      show: props.user?.type_user !== UserTypes.Administrator,
      click: () => (confirmDeleteAccount.value = true),
    },
  ];
});

function deleteAccount() {
  if (props.user?.id) {
    userStore.deleteAccount(props.user!.id!);
  }
}

async function promoterToSeller(file: File) {
  if (props.user?.id) {
    const response = await promotionsStore.addPromotion(props.user.id, file);
    if (response) {
      snackBarStore.showSnackbar(
        "success",
        "Submissão de vendedor enviada para análise."
      );
      hasPendingPromotion.value = true;
    }
  }
}

async function addSubmission(info: {
  category: number;
  certification: File;
  photo?: File;
}) {
  if (props.user!.categoryIds?.includes(info.category)) {
    snackBarStore.showSnackbar("error", "Você já é curador dessa categoria.");
  } else {
    const response = await submissionsStore.addSubmission(
      props.user!.id!,
      info.category,
      info.certification
    );
    if (response) {
      snackBarStore.showSnackbar(
        "success",
        "Submissão de adição de categoria enviada para análise."
      );
    }
  }
}
</script>

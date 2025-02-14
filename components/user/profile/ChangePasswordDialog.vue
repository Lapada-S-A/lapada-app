<template>
  <v-dialog v-model="showDialog" opacity="0.4" max-width="500" persistent>
    <v-card class="rounded-lg pa-4">
      <div>
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="font-subtitle font-weight-bold">Alterar senha</div>
          <v-btn
            id="close-filter-button"
            class="rounded-xl"
            variant="plain"
            :ripple="false"
            size="22"
            @click="cancel"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </div>

      <v-card-text class="px-4 py-4">
        <div class="font-weight-medium mb-2">Senha atual</div>
        <v-text-field
          v-model="currentPassword"
          placeholder="Senha atual"
          :type="currentPasswordVisible ? 'text' : 'password'"
          required
        >
          <template #append-inner>
            <v-icon
              v-if="currentPasswordVisible"
              class="cursor-pointer"
              @click="toggleCurrentPasswordVisibility"
            >
              mdi-eye-off
            </v-icon>
            <v-icon
              v-else
              class="cursor-pointer"
              @click="toggleCurrentPasswordVisibility"
            >
              mdi-eye
            </v-icon>
          </template>
        </v-text-field>

        <div class="font-weight-medium mb-2">Nova senha</div>
        <v-text-field
          v-model="newPassword"
          placeholder="Nova senha"
          :type="newPasswordVisible ? 'text' : 'password'"
          required
        >
          <template #append-inner>
            <v-icon
              v-if="newPasswordVisible"
              class="cursor-pointer"
              @click="toggleNewPasswordVisibility"
            >
              mdi-eye-off
            </v-icon>
            <v-icon
              v-else
              class="cursor-pointer"
              @click="toggleNewPasswordVisibility"
            >
              mdi-eye
            </v-icon>
          </template>
        </v-text-field>

        <div class="font-weight-medium mb-2">Confirmar senha</div>
        <v-text-field
          v-model="confirmPassword"
          placeholder="Confirmar senha"
          :type="confirmPasswordVisible ? 'text' : 'password'"
          required
        >
          <template #append-inner>
            <v-icon
              v-if="confirmPasswordVisible"
              class="cursor-pointer"
              @click="toggleConfirmPasswordVisibility"
            >
              mdi-eye-off
            </v-icon>
            <v-icon
              v-else
              class="cursor-pointer"
              @click="toggleConfirmPasswordVisibility"
            >
              mdi-eye
            </v-icon>
          </template>
        </v-text-field>
      </v-card-text>

      <v-card-actions class="px-4">
        <v-spacer />
        <v-btn
          class="btn btn-primary px-6 ml-2"
          :class="{
            'btn-disabled':
              !currentPassword || !newPassword || !confirmPassword,
          }"
          @click="changePassword"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const snackBarStore = useSnackbarStore();
const showDialog = ref(false);
const currentPassword = ref();
const newPassword = ref();
const confirmPassword = ref();

const currentPasswordVisible = ref(false);
const newPasswordVisible = ref(false);
const confirmPasswordVisible = ref(false);

function toggleCurrentPasswordVisibility() {
  currentPasswordVisible.value = !currentPasswordVisible.value;
}

function toggleNewPasswordVisibility() {
  newPasswordVisible.value = !newPasswordVisible.value;
}

function toggleConfirmPasswordVisibility() {
  confirmPasswordVisible.value = !confirmPasswordVisible.value;
}

function changePassword() {
  if (newPassword.value === confirmPassword.value) {
    if (userStore.currentUser?.id !== undefined) {
      userStore.updateUserPassword(newPassword.value, userStore.currentUser.id);
      snackBarStore.showSnackbar("success", "Senha alterada com sucesso!");
    }
    showDialog.value = false;
    reset();
  } else {
    snackBarStore.showSnackbar("error", "As senhas não coincidem");
  }
}

function cancel() {
  showDialog.value = false;
  reset();
}

function reset() {
  currentPassword.value = null;
  newPassword.value = null;
  confirmPassword.value = null;
}

defineExpose({
  showDialog,
});
</script>

<style scoped>
:deep(.v-input__prepend > .v-icon),
:deep(.v-field__append-inner > .v-icon, ) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
}
</style>

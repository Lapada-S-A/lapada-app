<template>
  <v-dialog v-model="showDialog" max-width="500">
    <v-card>
      <v-card-title>Alterar Senha</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="changePassword">
          <v-text-field
            v-model="currentPassword"
            label="Senha Atual"
            type="password"
            required
          />
          <v-text-field
            v-model="newPassword"
            label="Nova Senha"
            type="password"
            required
          />
          <v-text-field
            v-model="confirmPassword"
            label="Confirmar Nova Senha"
            type="password"
            required
          />
          <v-btn type="submit" color="primary">Alterar Senha</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const userStore = useUserStore();
const showDialog = ref(false);
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

function changePassword() {
  if (newPassword.value === confirmPassword.value) {
    if (userStore.currentUser?.id !== undefined) {
      userStore.updateUserPassword(newPassword.value, userStore.currentUser.id);
    } else {
      alert("User ID is not available");
    }
    showDialog.value = false;
  } else {
    alert("As senhas não coincidem");
  }
}

defineExpose({
  showDialog,
});
</script>

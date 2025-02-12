<template>
  <div>
    <div class="text-primary font-weight-semibold font-subtitle mb-4">
      Senha
    </div>

    <v-row>
      <v-col cols="4">
        <v-label
          for="password-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
          >Senha</v-label
        >
        <v-text-field
          id="password-field"
          v-model="password"
          placeholder="Senha"
          maxlength="16"
          :type="passwordVisible ? 'text' : 'password'"
          :error-messages="passwordError"
          @input="passwordError = []"
        >
          <template #append-inner>
            <v-icon
              v-if="passwordVisible"
              class="cursor-pointer"
              @click="togglePasswordVisibility"
            >
              mdi-eye-off
            </v-icon>
            <v-icon
              v-else
              class="cursor-pointer"
              @click="togglePasswordVisibility"
            >
              mdi-eye
            </v-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col cols="4">
        <v-label
          for="confirm-password-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
          >Confirmar senha</v-label
        >
        <v-text-field
          id="confirm-password-field"
          v-model="confirmPassword"
          placeholder="Confirmar senha"
          maxlength="16"
          :type="confirmPasswordVisible ? 'text' : 'password'"
          :error-messages="confirmPasswordError"
          @input="confirmPasswordError = []"
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
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const componentProps = defineProps<{ validate: boolean }>();
const emit = defineEmits(["update:validation", "update:password"]);
const password = ref<string>("");
const confirmPassword = ref<string>("");

const passwordVisible = ref<boolean>(false);
const confirmPasswordVisible = ref<boolean>(false);

const passwordError = ref<string[]>([]);
const confirmPasswordError = ref<string[]>([]);

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

function toggleConfirmPasswordVisibility() {
  confirmPasswordVisible.value = !confirmPasswordVisible.value;
}

function validatePasswords() {
  passwordError.value = [];
  confirmPasswordError.value = [];

  if (!password.value) {
    passwordError.value.push("Senha é obrigatória");
  } else if (password.value.length < 6) {
    passwordError.value.push("A senha deve ter no mínimo 6 caracteres");
  }

  if (!confirmPassword.value) {
    confirmPasswordError.value.push("Confirmar senha é obrigatório");
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.value.push("As senhas não coincidem");
  }

  return (
    passwordError.value.length === 0 && confirmPasswordError.value.length === 0
  );
}

watch(
  () => componentProps.validate,
  () => {
    if (validatePasswords()) {
      emit("update:password", password.value);
      emit("update:validation", true);
    } else {
      emit("update:validation", false);
    }
  }
);
</script>

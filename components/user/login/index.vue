<template>
  <div class="h-100 bg-primary d-flex justify-center align-center">
    <v-row class="d-flex justify-center align-center">
      <v-col
        cols="7"
        class="d-none d-lg-flex align-center justify-center pl-16 mr-n12"
      >
        <v-img
          src="~/assets/images/login-logo.svg"
          max-width="700"
          max-height="920"
        />
      </v-col>
      <v-col cols="5" class="d-flex justify-center align-center">
        <v-card class="px-10 py-6" width="450" height="625">
          <v-progress-linear
            v-if="loading"
            :height="4"
            indeterminate
            color="secondary"
            class="position-absolute left-0"
          />

          <div class="font-weight-bold font-biggertitle mb-1">Login</div>

          <div class="text-font-60 font-normal mb-12">
            Faça login para entrar na plataforma
          </div>

          <div>
            <v-label
              for="email-field"
              class="text-font-100 font-weight-semibold mb-2 ml-1"
              >E-mail</v-label
            >
            <v-text-field
              id="email-field"
              v-model="email"
              placeholder="E-mail"
              maxlength="50"
            />

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
              @keydown.enter="login"
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
          </div>

          <div class="font-normal text-font-60 text-center mb-8">
            Ainda não possui conta?
            <span
              class="cursor-pointer text-decoration-underline text-secondary"
              @click="$router.push('/register')"
              >Cadastre-se!</span
            >
          </div>

          <v-btn
            class="btn btn-primary w-100 font-large mb-16"
            height="50"
            :disabled="!email || !password"
            @click="login"
          >
            Login
          </v-btn>

          <div class="d-flex justify-center mt-4">
            <v-icon size="30" color="primary">mdi-gavel</v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();
const email = ref<string>();
const password = ref<string>();
const passwordVisible = ref<boolean>(false);
const loading = ref<boolean>(false);

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

function login() {
  loading.value = true;
  authStore
    .authenticate({ email: email.value, password: password.value })
    .then(() => {
      router.push("/");
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<style scoped>
:deep(.v-card) {
  border-radius: 6px;
}

:deep(.v-field__append-inner > .v-icon) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
  cursor: pointer;
}
</style>

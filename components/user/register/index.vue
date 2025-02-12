<template>
  <div class="h-100 bg-primary d-flex justify-center align-center">
    <v-card class="px-10 py-6 w-75">
      <div class="font-weight-bold font-biggertitle mb-1">Cadastro</div>

      <div class="text-font-60 font-normal mb-6">
        Crie uma conta na plataforma
      </div>

      <div class="d-flex flex-column ga-6 mb-2">
        <PersonalInfo
          v-model:user-personal-info="userPersonalInfo"
          v-model:validation="personalInfoValidation"
          :validate="validate"
        />

        <Password
          v-model:password="userPassword"
          v-model:validation="passwordValidation"
          :validate="validate"
        />

        <UserType v-model:user-type-selected="userTypeId" />
      </div>

      <div class="font-normal text-font-60 text-center mb-6">
        Já possui conta?
        <span
          class="cursor-pointer text-decoration-underline text-secondary"
          @click="$router.push('/login')"
          >Vá para página de login!</span
        >
      </div>

      <v-btn
        class="btn btn-primary w-100 font-large mb-8"
        height="50"
        @click="changeValidate"
        >Criar conta</v-btn
      >

      <div class="d-flex justify-center">
        <v-icon size="30" color="primary">mdi-gavel</v-icon>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import PersonalInfo from "@/components/user/register/PersonalInfo.vue";
import Password from "@/components/user/register/Password.vue";
import UserType from "@/components/user/register/UserType.vue";
import { UserTypes } from "~/stores/enum";
import type { User, UserPersonalInfo } from "~/interfaces/user";

const router = useRouter();
const snackBarStore = useSnackbarStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const user = ref<User>();
const userPersonalInfo = ref<UserPersonalInfo>();
const userPassword = ref<string>();
const validate = ref<boolean>(false);
const personalInfoValidation = ref<boolean>(false);
const passwordValidation = ref<boolean>(false);
const userTypeId = ref<UserTypes>(UserTypes.Buyer);

const isFormValidated = computed(() => {
  return personalInfoValidation.value && passwordValidation.value;
});

watch(
  () => isFormValidated.value,
  async () => {
    if (isFormValidated.value) {
      await submitForm();
    }
  }
);

async function submitForm() {
  let result = false;
  updateUser();
  if (user.value) {
    const response = await userStore.registerUser(user.value);
    if (response) {
      result = true;
    }
  }

  if (result) {
    snackBarStore.showSnackbar("success", "Usuário cadastrado com sucesso!");
    authStore.disauthenticate();
    router.push("/login");
  }
}

function updateUser() {
  if (userPersonalInfo.value && userPassword.value) {
    user.value = {
      username: userPersonalInfo.value.username!,
      email: userPersonalInfo.value.email!,
      cpf: userPersonalInfo.value.cpf!,
      phone_number: userPersonalInfo.value.phone!,
      birthdate: userPersonalInfo.value.birthDate!,
      password: userPassword.value,
      type_user: userTypeId.value,
    };
  }
}

function changeValidate() {
  personalInfoValidation.value = false;
  passwordValidation.value = false;
  validate.value = true;
  nextTick(() => {
    validate.value = false;
  });
}
</script>

<style scoped>
:deep(.v-field__append-inner > .v-icon) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
  cursor: pointer;
}
</style>

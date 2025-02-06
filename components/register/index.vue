<template>
  <div class="h-100 bg-primary d-flex justify-center align-center">
    <v-card class="px-10 py-6 w-75">
      <div class="font-weight-bold font-biggertitle mb-1">Cadastro</div>

      <div class="text-font-60 font-normal mb-6">
        Crie uma conta na plataforma
      </div>

      <div class="d-flex flex-column ga-6 mb-2">
        <PersonalInfo
          v-model:validation="personalInfoValidation"
          :validate="validate"
        />

        <Password
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
        @click="submitForm"
        >Criar conta</v-btn
      >

      <div class="d-flex justify-center">
        <v-icon size="30" color="primary">mdi-gavel</v-icon>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import PersonalInfo from "@/components/register/PersonalInfo.vue";
import Password from "@/components/register/Password.vue";
import UserType from "@/components/register/UserType.vue";
import { UserTypes } from "~/stores/enum";

const validate = ref<boolean>(false);
const personalInfoValidation = ref<boolean>(false);
const passwordValidation = ref<boolean>(false);
const userTypeId = ref<UserTypes>(UserTypes.Buyer);

function submitForm() {
  validate.value = false;
  console.log(personalInfoValidation, passwordValidation, userTypeId);
  nextTick(() => {
    validate.value = true;
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

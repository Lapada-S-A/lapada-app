<template>
  <div>
    <div class="text-primary font-weight-semibold font-subtitle mb-4">
      Informações Pessoais
    </div>

    <v-row>
      <v-col cols="4">
        <v-label
          for="name-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
          >Nome</v-label
        >
        <v-text-field
          id="name-field"
          v-model="personalInfo.name"
          placeholder="Nome"
          maxlength="50"
          :error-messages="nameError"
          @input="nameError = []"
        />
      </v-col>

      <v-col cols="4">
        <v-label
          for="email-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
          >E-mail</v-label
        >
        <v-text-field
          id="email-field"
          v-model="personalInfo.email"
          placeholder="E-mail"
          maxlength="50"
          :error-messages="emailError"
          @input="
            validateEmail;
            emailError = [];
          "
        />
      </v-col>

      <v-col cols="4">
        <v-label
          for="cpf-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
          >CPF</v-label
        >
        <v-text-field
          id="cpf-field"
          v-model="personalInfo.cpf"
          placeholder="CPF"
          :error-messages="cpfError"
          @input="
            formatCPF();
            cpfError = [];
          "
        />
      </v-col>

      <v-col cols="4">
        <v-label
          for="birth-date-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
        >
          Data de Nascimento
        </v-label>
        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290"
          min-width="auto"
        >
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              id="birth-date-field"
              :value="formatDatePickerDate(personalInfo.birthDate)"
              readonly
              placeholder="Data de Nascimento"
              append-inner-icon="mdi-calendar-month"
              clearable
              :error-messages="birthDateError"
              @click:clear="clearDate"
            />
          </template>

          <v-date-picker
            v-model="tempDate"
            locale="pt-BR"
            size="small"
            @input="dateMenu = false"
          >
            <template #actions>
              <v-btn :ripple="false" @click="clearDate">Limpar</v-btn>
              <v-btn
                class="bg-primary"
                :ripple="false"
                @click="
                  confirmDate();
                  birthDateError = [];
                "
              >
                Salvar
              </v-btn>
            </template>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="4">
        <v-label
          for="phone-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
          >Telefone</v-label
        >
        <v-text-field
          id="phone-field"
          v-model="personalInfo.phone"
          placeholder="Telefone"
          hide-spin-buttons
          :error-messages="phoneError"
          @input="
            formatPhone();
            phoneError = [];
          "
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
interface PersonalInfo {
  name: string | null;
  email: string | null;
  cpf: string | null;
  birthDate: string | null;
  phone: string | null;
}

const componentProps = defineProps<{ validate: boolean }>();
const emit = defineEmits(["update:validation"]);
const personalInfo = ref<PersonalInfo>({
  name: null,
  email: null,
  cpf: null,
  birthDate: null,
  phone: null,
});

const dateMenu = ref(false);
const tempDate = ref(null);

const nameError = ref<string[]>([]);
const emailError = ref<string[]>([]);
const cpfError = ref<string[]>([]);
const birthDateError = ref<string[]>([]);
const phoneError = ref<string[]>([]);

function clearDate() {
  personalInfo.value.birthDate = null;
  tempDate.value = null;
}

function confirmDate() {
  personalInfo.value.birthDate = tempDate.value;
  dateMenu.value = false;
}

function formatCPF() {
  if (personalInfo.value.cpf) {
    const value = personalInfo.value.cpf.replace(/\D/g, "");
    if (value.length <= 3) {
      personalInfo.value.cpf = value;
    } else if (value.length <= 6) {
      personalInfo.value.cpf = value.slice(0, 3) + "." + value.slice(3);
    } else if (value.length <= 9) {
      personalInfo.value.cpf =
        value.slice(0, 3) + "." + value.slice(3, 6) + "." + value.slice(6);
    } else {
      personalInfo.value.cpf =
        value.slice(0, 3) +
        "." +
        value.slice(3, 6) +
        "." +
        value.slice(6, 9) +
        "-" +
        value.slice(9, 11);
    }
    validateCPF();
  }
}

function formatPhone() {
  if (personalInfo.value.phone) {
    const value = personalInfo.value.phone.replace(/\D/g, "");
    if (value.length <= 2) {
      personalInfo.value.phone = `(${value}`;
    } else if (value.length <= 6) {
      personalInfo.value.phone = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 10) {
      personalInfo.value.phone = `(${value.slice(0, 2)}) ${value.slice(
        2,
        7
      )}-${value.slice(7)}`;
    } else {
      personalInfo.value.phone = `(${value.slice(0, 2)}) ${value.slice(
        2,
        7
      )}-${value.slice(7, 11)}`;
    }
    validatePhone();
  }
}

function validateName() {
  if (!personalInfo.value.name) {
    nameError.value = ["Nome é obrigatório"];
    return false;
  }
  nameError.value = [];
  return true;
}

function validateEmail() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!personalInfo.value.email) {
    emailError.value = ["E-mail é obrigatório"];
    return false;
  } else if (!emailPattern.test(personalInfo.value.email)) {
    emailError.value = ["E-mail deve ser válido"];
    return false;
  }
  emailError.value = [];
  return true;
}

function validateCPF() {
  const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!personalInfo.value.cpf) {
    cpfError.value = ["CPF é obrigatório"];
    return false;
  } else if (!cpfPattern.test(personalInfo.value.cpf)) {
    cpfError.value = ["CPF deve ter 11 números"];
    return false;
  }
  cpfError.value = [];
  return true;
}

function validateBirthDate() {
  const currentDate = new Date();
  const birthDate = new Date(personalInfo.value.birthDate || "");
  if (!personalInfo.value.birthDate) {
    birthDateError.value = ["Data de nascimento é obrigatória"];
    return false;
  } else if (birthDate > currentDate) {
    birthDateError.value = ["Data de nascimento não pode ser futura"];
    return false;
  }
  birthDateError.value = [];
  return true;
}

function validatePhone() {
  const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
  if (!personalInfo.value.phone) {
    phoneError.value = ["Telefone é obrigatório"];
    return false;
  } else if (!phonePattern.test(personalInfo.value.phone)) {
    phoneError.value = ["Telefone deve ter 11 números"];
    return false;
  }
  phoneError.value = [];
  return true;
}

watch(
  () => componentProps.validate,
  () => {
    const nameValidation = validateName();
    const emailValidation = validateEmail();
    const cpfValidation = validateCPF();
    const birthDateValidation = validateBirthDate();
    const phoneValidation = validatePhone();

    if (
      nameValidation &&
      emailValidation &&
      cpfValidation &&
      birthDateValidation &&
      phoneValidation
    ) {
      emit("update:validation", true);
    } else {
      emit("update:validation", false);
    }
  }
);
</script>

<style scoped>
:deep(.v-picker__actions .v-btn) {
  text-transform: none;
  padding: 0 16px;
}
</style>

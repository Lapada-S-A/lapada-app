<template>
  <div>
    <div class="font-subtitle font-weight-bold text-primary mb-8">
      Minhas informações
    </div>
    <div class="d-flex flex-column ga-4">
      <v-row>
        <v-col cols="5">
          <v-hover>
            <template #default="{ isHovering, props }">
              <span class="d-flex align-center" v-bind="props">
                <div class="font-weight-semibold mr-2">Nome</div>
                <v-btn
                  v-if="isHovering"
                  variant="text"
                  size="20"
                  @click="editName"
                >
                  <v-icon size="18">mdi-pencil-outline</v-icon>
                </v-btn>
              </span>
            </template>
          </v-hover>
          <div class="text-font-60">{{ user ? user.username : "" }}</div>
        </v-col>
        <v-col cols="5">
          <div class="font-weight-semibold">E-mail</div>
          <div class="text-font-60">{{ user ? user.email : "" }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <div class="font-weight-semibold">Data de nascimento</div>
          <div class="text-font-60">
            {{ formatDatePickerDate(user ? user.birthdate : "") }}
          </div>
        </v-col>
        <v-col cols="5">
          <div class="font-weight-semibold">CPF</div>
          <div class="text-font-60">{{ user ? user.cpf : "" }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <v-hover>
            <template #default="{ isHovering, props }">
              <span class="d-flex align-center" v-bind="props">
                <div class="font-weight-semibold mr-2">Telefone</div>
                <v-btn
                  v-if="isHovering"
                  variant="text"
                  size="20"
                  @click="editPhoneNumber"
                >
                  <v-icon size="18">mdi-pencil-outline</v-icon>
                </v-btn>
              </span>
            </template>
          </v-hover>
          <div class="text-font-60">{{ user ? user.phone_number : "" }}</div>
        </v-col>
        <v-col cols="5">
          <div class="font-weight-semibold">Tipo de usuário</div>
          <div class="text-font-60">
            {{ getUserTypeName(user ? user.type_user : 1) }}
          </div>
        </v-col>
      </v-row>
    </div>
    <EditInfoDialog
      v-model="showEditDialog"
      :label="editField"
      :info="editInfo"
      @confirmed="updateInfo"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/interfaces/user";
import { UserTypes } from "~/stores/enum";
import EditInfoDialog from "./EditInfoDialog.vue";
const emit = defineEmits(["updateUser"]);
const componentProps = defineProps<{ user: User | null }>();

const userToEdit = ref({
  id: componentProps.user ? componentProps.user.id : "",
  username: componentProps.user ? componentProps.user.username : "",
  phone_number: componentProps.user ? componentProps.user.phone_number : "",
});
const showEditDialog = ref(false);
const editField = ref("");
const editInfo = ref("");

function getUserTypeName(typeId: UserTypes) {
  switch (typeId) {
    case UserTypes.Buyer:
      return "Comprador";
    case UserTypes.Seller:
      return "Vendedor";
    case UserTypes.Curator:
      return "Curador";
    case UserTypes.Administrator:
      return "Administrador";
  }
}

function editName() {
  editField.value = "Nome";
  editInfo.value = componentProps.user!.username;
  showEditDialog.value = true;
}

function editPhoneNumber() {
  editField.value = "Telefone";
  editInfo.value = componentProps.user!.phone_number;
  showEditDialog.value = true;
}

function updateInfo(newValue: string) {
  if (editField.value === "Nome") {
    userToEdit.value.username = newValue;
  } else if (editField.value === "Telefone") {
    userToEdit.value.phone_number = newValue;
  }
  emit("updateUser", userToEdit.value);
  showEditDialog.value = false;
}
</script>

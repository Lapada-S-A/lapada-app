<template>
  <CommonMainCard>
    <CommonMaintainTable
      :items="items"
      :headers="headers"
      :loading="loading"
      :pagination="pagination"
      :title="'tipo'"
      @update:pagination="updatePagination"
      @add:item="createType"
      @update:item="updateType"
      @delete:item="deleteType"
    />
  </CommonMainCard>
</template>

<script setup lang="ts">
import type { Type } from "~/interfaces/type";
import type { Pagination } from "~/interfaces/pagination";
import type { Header } from "~/interfaces/table";

const typesStore = useTypesStore();
const snackbarStore = useSnackbarStore();
const items = ref<Type[]>([]);
const headers = ref<Header[]>([
  { title: "ID", key: "id", sortable: true },
  { title: "Nome", key: "name", sortable: true },
  { title: "Descrição", key: "description"},
  { title: "Ações", key: "actions", align: "center" },
]);

const pagination = ref<Pagination>({
  page: 1,
  per_page: 10,
  total: 100,
  order_by: "id",
  order_desc: false,
  order_asc: false,
});

const loading = ref(false);

const fetchTypes = async () => {
  loading.value = true;

  const response = await typesStore.getTypesPaginated({
    page: pagination.value.page.toString(),
    per_page: pagination.value.per_page.toString(),
    order_by: pagination.value.order_by,
    order_desc: pagination.value.order_desc.toString(),
    order_asc: pagination.value.order_asc.toString(),
  });

  if (response) {
    items.value = response.types;
    pagination.value.total = response.total;
  }

  loading.value = false;
};

const createType = async (type: Type) => {
  const createdType = await typesStore.addType(type);

  if (createdType) {
    items.value.unshift(createdType);
    snackbarStore.showSnackbar("success", "Tipo de leilão adicionado com sucesso!");
  }
};

const updatePagination = (newPagination: Pagination) => {
  pagination.value = newPagination;
  fetchTypes();
};

const updateType = async (type: Type) => {
  const updatedType = await typesStore.updateType(type);

  if (updatedType) {
    const index = items.value.findIndex((item) => item.id === type.id);
    if (index !== -1) {
      items.value[index] = type;
      snackbarStore.showSnackbar(
        "success",
        "Tipo de leilão editado com sucesso!"
      );
    }
  }
};

const deleteType = async (typeId: number) => {
  const isDeleted = await typesStore.deleteType(typeId);

  if (isDeleted) {
    const index = items.value.findIndex((item) => item.id === typeId);
    if (index !== -1) {
      items.value.splice(index, 1);
      snackbarStore.showSnackbar(
        "success",
        "Tipo de leilão removido com sucesso!"
      );
    }
  }
};

onBeforeMount(async () => {
  await fetchTypes();
});
</script>

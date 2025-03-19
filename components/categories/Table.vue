<template>
  <CommonMainCard>
    <CommonMaintainTable
      :items="items"
      :headers="headers"
      :loading="loading"
      :pagination="pagination"
      :title="'categoria'"
      @update:pagination="updatePagination"
      @add:item="createCategory"
      @update:item="updateCategory"
      @delete:item="deleteCategory"
    />
  </CommonMainCard>
</template>

<script setup lang="ts">
import type { Category } from "~/interfaces/category";
import type { Pagination } from "~/interfaces/pagination";
import type { Header } from "~/interfaces/table";

const categoriesStore = useCategoriesStore();
const snackbarStore = useSnackbarStore();
const items = ref<Category[]>([]);
const headers = ref<Header[]>([
  { title: "ID", key: "id", sortable: true },
  { title: "Nome", key: "name", sortable: true },
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

const fetchCategories = async () => {
  loading.value = true;

  const response = await categoriesStore.getCategoriesPaginated({
    page: pagination.value.page.toString(),
    per_page: pagination.value.per_page.toString(),
    order_by: pagination.value.order_by,
    order_desc: pagination.value.order_desc.toString(),
    order_asc: pagination.value.order_asc.toString(),
  });

  if (response) {
    items.value = response.categories;
    pagination.value.total = response.total;
  }

  loading.value = false;
};

const updatePagination = (newPagination: Pagination) => {
  pagination.value = newPagination;
  fetchCategories();
};

const createCategory = async (category: Category) => {
  const createdCategory = await categoriesStore.addCategory(category);

  if (createdCategory) {
    fetchCategories();
    snackbarStore.showSnackbar("success", "Categoria adicionada com sucesso!");
  }
};

const updateCategory = async (category: Category) => {
  const updatedCategory = await categoriesStore.updateCategory(category);

  if (updatedCategory) {
    const index = items.value.findIndex((item) => item.id === category.id);
    if (index !== -1) {
      items.value[index] = category;
      snackbarStore.showSnackbar("success", "Categoria editada com sucesso!");
    }
  }
};

const deleteCategory = async (categoryId: number) => {
  const isDeleted = await categoriesStore.deleteCategory(categoryId);

  if (isDeleted) {
    const index = items.value.findIndex((item) => item.id === categoryId);
    if (index !== -1) {
      fetchCategories();
      snackbarStore.showSnackbar("success", "Categoria removida com sucesso!");
    }
  }
};

onBeforeMount(async () => {
  await fetchCategories();
});
</script>

<template>
  <v-btn
    class="btn btn-primary d-flex align-center"
    width="150"
    height="38"
    @click="addDialog = true"
  >
    <template #prepend>
      <v-icon>mdi-plus</v-icon>
      <div class="ml-2">Adicionar</div>
    </template>
  </v-btn>
  <v-data-table-server
    :items="items"
    :headers="headers"
    :loading="loading"
    loading-text="Carregando..."
    item-value="id"
    :items-length="pagination.total"
    class="mt-2 text-wrap font-large"
    :page="pagination.page"
    :items-per-page="pagination.per_page"
    :items-per-page-options="[5, 10, 25, 50]"
    :sort-by="[
      {
        key: pagination.order_by,
        order: pagination.order_desc ? 'desc' : 'asc',
      },
    ]"
    :sort-desc="pagination.order_desc"
    @update:page="updatePage"
    @update:items-per-page="updatePerPage"
    @update:sort="updateSort"
  >
    <template #headers>
      <tr>
        <th
          v-for="header in headers"
          :id="`table-header-${header.key}`"
          :key="header.key"
          class="font-weight-bold"
          :class="{
            'text-center': header.align === 'center',
            'cursor-pointer': header.sortable,
          }"
          @click="sortableHeaderClick(header)"
        >
          <div class="d-flex align-center">
            <div class="text-center">{{ header.title }}</div>
            <v-icon v-if="header.sortable" size="16" class="ml-2">
              {{
                pagination.order_by === header.key
                  ? pagination.order_desc
                    ? "mdi-arrow-down"
                    : "mdi-arrow-up"
                  : "mdi-arrow-up-down"
              }}
            </v-icon>
          </div>
        </th>
      </tr>
    </template>

    <template #[`item.actions`]="{ item }">
      <div class="d-flex align-center justify-center ga-3">
        <v-btn
          size="22"
          variant="text"
          :ripple="false"
          @click="setEditId(item)"
        >
          <v-icon size="22">mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn
          size="22"
          variant="text"
          :ripple="false"
          @click="setDeleteId(item)"
        >
          <v-icon size="22" color="error">mdi-delete-outline</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table-server>

  <CommonMaintainDialog
    v-model="addDialog"
    :title="`Adicionar ${title}`"
    :fields="emptyFields"
    @confirm="(value: any) => $emit('add:item', value)"
  />

  <CommonMaintainDialog
    v-model="editDialog"
    :title="`Editar ${title}`"
    :fields="fieldsFromItem"
    @confirm="(value: any) => $emit('update:item', { id: idToEdit, ...value })"
  />

  <CommonConfirmationDialog
    v-model="deleteDialog"
    :text="'Você tem certeza que deseja'"
    :highlight="'excluir esse item'"
    @confirm="$emit('delete:item', idToDelete)"
  /> 
</template>

<script setup lang="ts">
import type { Pagination } from "~/interfaces/pagination";
import type { Header } from "~/interfaces/table";

const componentProps = defineProps({
  items: {
    type: Array as () => unknown[],
    required: true,
  },
  headers: {
    type: Array as () => Header[],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  pagination: {
    type: Object as () => Pagination,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  "update:pagination",
  "add:item",
  "update:item",
  "delete:item",
]);

const addDialog = ref<boolean>(false);
const editDialog = ref<boolean>(false);
const idToEdit = ref<number>(-1);
const deleteDialog = ref<boolean>(false);
const idToDelete = ref<number>(-1);

const fieldsFromItem = computed(() => {
  const fields: { label: string; key: string; value: string }[] = [];
  const item = componentProps.items.find(
    (item) => (item as { id: number }).id === idToEdit.value
  );
  if (item) {
    Object.entries(item).forEach(([key, value]) => {
      if (key !== "id") {
        const header = componentProps.headers.find(
          (header) => header.key === key
        );
        if (header) {
          fields.push({
            label: header.title,
            value,
            key,
          });
        }
      }
    });
  }
  return fields;
});

const emptyFields = computed(() => {
  const fields: { label: string; key: string; value: null }[] = [];
  const item = componentProps.items[0];

  if (item) {
    Object.keys(item).forEach((key) => {
      if (key !== "id") {
        const header = componentProps.headers.find(
          (header) => header.key === key
        );
        if (header) {
          fields.push({
            label: header.title,
            value: null,
            key,
          });
        }
      }
    });
  }

  return fields;
});

const updatePage = (newPage: number) => {
  emit("update:pagination", { ...componentProps.pagination, page: newPage });
};

const updatePerPage = (newPerPage: number) => {
  emit("update:pagination", {
    ...componentProps.pagination,
    per_page: newPerPage,
  });
};

const updateSort = (order_by: string[], order_desc: boolean[]) => {
  const sortField = order_by[0];
  const descending = order_desc[0];
  emit("update:pagination", {
    ...componentProps.pagination,
    order_by: sortField,
    order_desc: descending,
    order_asc: !descending,
  });
};

const sortableHeaderClick = (header: Header) => {
  if (!header.sortable) return;

  const newSortDesc =
    componentProps.pagination.order_by === header.key
      ? !componentProps.pagination.order_desc
      : false;

  emit("update:pagination", {
    ...componentProps.pagination,
    order_by: header.key,
    order_desc: newSortDesc,
    order_asc: !newSortDesc,
  });
};

const setEditId = (item: unknown) => {
  idToEdit.value = (item as { id: number }).id;
  editDialog.value = true;
};

const setDeleteId = (item: unknown) => {
  idToDelete.value = (item as { id: number }).id;
  deleteDialog.value = true;
};
</script>

<style scoped>
.v-table > :deep(.v-table__wrapper) {
  padding-bottom: 16px !important;
}

.v-table > :deep(.v-table__wrapper) > table > thead > tr > th {
  background-color: rgba(var(--v-theme-primary));
  color: rgba(var(--v-theme-font-10));
  border-bottom: none;

  &:first-child {
    width: 120px;
    padding-left: 50px;
  }

  &:last-child {
    width: 150px;
    padding-right: 120px;
  }
}

.v-table > :deep(.v-table__wrapper) > table > tbody > tr > td {
  border-bottom: none !important;
  white-space: nowrap;
  text-wrap: wrap;

  &:first-child {
    width: 150px;
    padding-left: 50px;
  }

  &:last-child {
    width: 150px;
    padding-right: 120px;
  }
}

.v-table > :deep(.v-data-table-footer) {
  padding-top: 12px !important;
}

.v-table > :deep(.v-divider) {
  display: none !important;
}

.v-table > :deep(.v-table__wrapper) > table > tbody > tr:nth-child(even) {
  background-color: rgba(var(--v-theme-table-row-even));
}

.v-table > :deep(.v-table__wrapper) > table > tbody > tr:nth-child(odd) {
  background-color: rgba(var(--v-theme-table-row-odd));
}
</style>

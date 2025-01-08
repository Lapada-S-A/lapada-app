<template>
  <v-navigation-drawer permanent expand-on-hover rail class="bg-primary">
    <v-list>
      <v-list-item>
        <template #prepend>
          <v-icon class="text-font-primary">mdi-menu</v-icon>
        </template>
        <template #title>
          <v-img
            src="~/assets/images/title-logo.svg"
            max-width="120"
            class="cursor-pointer"
            @click="$router.push('/')"
          />
        </template>
      </v-list-item>
    </v-list>

    <v-list>
      <v-list-item
        v-for="(action, index) in userActionsStore.userActions"
        :key="index"
        :active="isOptionActive(action.route)"
        variant="text"
        @click="$router.push(action.route)"
      >
        <template #prepend>
          <v-icon>{{
            isOptionActive(action.route)
              ? action.icon
              : `${action.icon}-outline`
          }}</v-icon>
        </template>
        <template #title>
          <div class="font-normal">{{ action.label }}</div>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const router = useRouter();
const userActionsStore = useUserActionsStore();

function isOptionActive(route: string): boolean {
  return router.currentRoute.value.path === route;
}
</script>

<style scoped>
:deep(.v-list-item__prepend > .v-icon) {
  opacity: 1;
}

:deep(.v-list-item--active .v-list-item-title) {
  font-weight: bold !important;
}
</style>

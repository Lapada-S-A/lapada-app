<template>
  <v-layout>
    <LayoutsDefaultNavigationDrawer />
    <LayoutsDefaultAppBar />
    <v-main class="d-flex align-center justify-center ml-4">
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>
:deep(.v-application__wrap) {
  min-height: 0;
}
</style>

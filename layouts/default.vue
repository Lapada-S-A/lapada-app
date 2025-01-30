<template>
  <v-layout class="h-100">
    <LayoutsDefaultNavigationDrawer />
    <LayoutsDefaultAppBar />
    <v-main>
      <v-container
        class="d-flex justify-center align-center px-8 bg-transparent"
        fluid
      >
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>
:deep(.v-application__wrap) {
  min-height: 0;
}

:deep(.v-application) {
  background-color: transparent !important;
}

:deep(.v-container) {
  width: 100%;
  height: calc(100vh - 64px);
  margin-left: 0;
  margin-right: 0;
  background-image: url("@/assets/images/background.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

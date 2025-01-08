<template>
    <v-layout>
        <LayoutsDefaultNavigationDrawer />
        <v-main class="d-flex align-center justify-center">
            <v-container class="h-100" fluid>
                <slot />
            </v-container>
        </v-main>
    </v-layout>
</template>
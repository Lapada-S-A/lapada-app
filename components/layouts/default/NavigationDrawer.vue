<template>
    <v-navigation-drawer permanent expand-on-hover rail class="bg-primary">
        <v-list>
            <v-list-item>
                <template #prepend>
                    <v-icon class="text-font-primary">mdi-menu</v-icon>
                </template>
                <template #title>
                    <v-img src="~/assets/images/title-logo.svg" max-width="120" class="cursor-pointer" @click="$router.push('/')"/>
                </template>
            </v-list-item>
        </v-list>

        <v-list>
            <v-list-item variant="text">
                <template #prepend>
                    <v-icon>mdi-shopping-search-outline</v-icon>
                </template>
                <template #title>
                    <div class="font-normal">Leilões disponíveis</div>
                </template>
            </v-list-item>

            <v-list-item>
                <template #prepend>
                    <v-icon>mdi-invoice-text-multiple-outline</v-icon>
                </template>
                <template #title>
                    <div class="font-normal">Meus lances</div>
                </template>
            </v-list-item>

            <v-list-item>
                <template #prepend>
                    <v-icon>mdi-forum-outline</v-icon>
                </template>
                <template #title>
                    <div class="font-normal">Conversas</div>
                </template>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>


<style scoped>
:deep(.v-list-item__prepend > .v-icon) {
    opacity: 1;
}

:deep(.v-list-item--active .v-list-item-title) {
    font-weight: bold !important;
}
</style>
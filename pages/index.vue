<template>
    <div>
        index page
        {{ counterStore.count }}
        <v-btn @click="counterStore.increment">click</v-btn>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/stores/counter';

const counterStore = useCounterStore();

</script>
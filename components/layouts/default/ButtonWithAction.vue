<template>
    <v-btn
      v-if="showButton"
      :id="buttonId"
      class="rounded-lg border d-flex flex-column align-center justify-center large-square-btn ma-2 opacity-70"
      :color="color"
      stacked
      :elevation="elevation"
      :outlined="outlined"
      :style="{ width: `${width}px`, height: `${height}px` }"
      @click="handleClick"
    >
      <v-icon v-if="icon" :size="iconSize" class="mb-2">{{ icon }}</v-icon>
      <div  class="text-center font-weight-black font-large" >{{ label }}</div>
    </v-btn>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
    iconSize: {
      type: [Number, String],
      default: 60,
    },
    color: {
      type: String,
      default: 'primary',
    },
    elevation: {
      type: [Number, String],
      default: 2,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    buttonId: {
      type: String,
      default: 'icon-button',
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [Number, String],
      default: 270, 
    },
    height: {
      type: [Number, String],
      default: 160,
    },
    onClick: {
      type: Function,
      default: null,
    },
  })
  
  const handleClick = () => {
    if (props.onClick) {
      props.onClick()
    }
  }
  </script>
  
  <style scoped>
  
  .large-square-btn {
    text-transform: none;
    font-size: 16px;
    padding: 0;
  }
  </style>
  
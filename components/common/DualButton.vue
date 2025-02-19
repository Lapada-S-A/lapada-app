<template>
  <div class="dual-button">
    <v-btn
      class="btn btn-primary font-title"
      width="225"
      height="65"
      :color="leftButtonColor"
      :elevation="elevation"
      :disabled="leftButtonDisabled"
      @click="onLeftClick"
    >
      {{ leftButtonText }}
    </v-btn>
    <v-btn
      class="btn btn-primary font-title"
      width="225"
      height="65"
      :color="rightButtonColor"
      :elevation="elevation"
      :disabled="rightButtonDisabled"
      @click="onRightClick"
    >
      {{ rightButtonText }}
    </v-btn>
  </div>
</template>

<script setup>
defineProps({
  leftButtonText: {
    type: String,
    default: "Cancelar",
  },
  rightButtonText: {
    type: String,
    default: "Encerrar",
  },
  leftButtonColor: {
    type: String,
    default: "error",
  },
  rightButtonColor: {
    type: String,
    default: "primary",
  },
  elevation: {
    type: Number,
    default: 1,
  },
  leftButtonDisabled: {
    type: Boolean,
    default: false,
  },
  rightButtonDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["left-click", "right-click"]);

const onLeftClick = () => {
  emit("left-click");
};

const onRightClick = () => {
  emit("right-click");
};
</script>

<style scoped>
.dual-button {
  display: flex;
  gap: 10px;
}
.btn-custom {
  font-weight: 600 !important;
  width: 225px;
  height: 65px !important;
  font-size: 24px;
  text-transform: none;
}
</style>

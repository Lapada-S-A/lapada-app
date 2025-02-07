<template>
  <div class="dual-button">
    <v-btn
      class="rounded-lg btn-custom font-weight-bold"
      :color="leftButtonColor"
      :elevation="elevation"
      :disabled="leftButtonDisabled"
      @click="onLeftClick"
    >
      {{ leftButtonText }}
    </v-btn>
    <v-btn
      class="rounded-lg btn-custom font-weight-bold"
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
    default: "red",
  },
  rightButtonColor: {
    type: String,
    default: "blue",
  },
  elevation: {
    type: Number,
    default: 2,
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
  gap: 16px;
}
.btn-custom {
  width: 200px;
  height: 70px !important;
  font-size: 25px;
  text-transform: none;
}
</style>

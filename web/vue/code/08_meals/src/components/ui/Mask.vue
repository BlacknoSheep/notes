<template>
  <Teleport to="body">
    <div class="mask" v-show="props.isShow" @click.self="$emit('hide')" :="$attrs">
      <slot></slot>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps(["isShow"]);
const emit = defineEmits(["hide"]);
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

<template>
  <div id="circle"></div>
</template>

<script setup>
const props = defineProps(["color", "diameter"]);
</script>

<style scoped>
/* 根据接收到到参数画圆 */
#circle {
  width: v-bind(diameter);
  height: v-bind(diameter);
  border-radius: 50%;
  background-color: v-bind(color);
}
</style>

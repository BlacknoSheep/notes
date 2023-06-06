<template>
  <div class="warpper">
    <span>A组件</span>
    <A v-if="count > 0" :count="count - 1"></A>
  </div>
</template>

<script setup>
const props = defineProps(["count"]);
</script>

<style scoped>
.warpper {
  margin-left: 10px;
}
</style>

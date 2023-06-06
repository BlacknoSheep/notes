<template>
  <div class="tree">
    <div v-for="item in props.data" :key="item.name">
      <input type="checkbox" v-model="item.checked" />
      <span>{{ item.name }}</span>
      <Tree v-if="item.children.length" :data="item.children"></Tree>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["data"]);
</script>

<style scoped>
.tree {
  margin-left: 10px;
}
</style>

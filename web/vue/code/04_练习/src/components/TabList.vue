<!-- 热度列表 -->
<template>
  <div class="tab_list">
    <!-- 使用v-for -->
    <TabItem v-for="item in props.items" :item="item" :max_hot="max_hot"></TabItem>
  </div>
</template>

<script setup>
import TabItem from "./TabItem.vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
const max_hot = props.items[0].hot;
</script>

<style scoped>
.tab_list {
  margin: 20px;
}
</style>

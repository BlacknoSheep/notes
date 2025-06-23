<!-- 热度条 -->
<template>
  <div class="hot_bar">
    <div class="inner">{{ props.hot }}热度</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["hot", "max_hot"]);
const width = computed(() => {
  return (props.hot / props.max_hot) * 100 + "%";
});
</script>

<style scoped>
.hot_bar {
  border-radius: 20px;
  background-color: rgb(3, 37, 103);
  text-indent: 0.5em;
  overflow: hidden;
}

.inner {
  width: v-bind(width);
  background-image: linear-gradient(90deg, rgb(187, 3, 52) 50%, rgb(66, 2, 12));
  border-radius: 20px;
  /* 文字不换行 */
  white-space: nowrap;
}
</style>

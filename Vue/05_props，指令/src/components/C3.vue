<!-- 单根组件 -->
<template>
  <div>
    <h3>我是C3</h3>
  </div>
</template>

<script>
// 关闭自动透传
export default {
  inheritAttrs: false,
};
</script>
<script setup>
// 手动透传仍有效
import { useAttrs } from "vue";
console.log(useAttrs());
</script>

<script setup>
import { ref } from "vue";
import A from "./components/A.vue";
import B from "./components/B.vue";
const isA = ref(true);
</script>

<template>
  <!--
    component：动态组件
      - 最终是什么标签由 is 属性决定
  -->
  <component is="i">我是component</component>
  <div>
    <button @click="isA = !isA">切换组件</button>
    <component :is="isA ? A : B"></component>
  </div>
</template>

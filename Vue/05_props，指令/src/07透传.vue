<template>
  <!--
    透传属性
      - 在组件上设置的属性，会自动传递给组件的根元素
      - 透传会发生在没有被声明为 props 和 emit 的属性上
      - class、style 等属性的值会合并而非覆盖
      - 自动的透传只适用于单根组件
  -->
  <h1 class="redText">属性的透传</h1>
  <C class="redText"></C>
  <hr />
  <C2 class="app" style="color: aqua"></C2>
  <hr />
  <C3 class="cccc3" style="color: green"></C3>
</template>

<script setup>
import C from "./components/C.vue";
import C2 from "./components/C2.vue";
import C3 from "./components/C3.vue";
</script>

<style scoped>
.redText {
  color: red;
}
</style>

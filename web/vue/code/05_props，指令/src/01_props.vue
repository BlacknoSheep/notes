<script setup>
import { ref } from "vue";
import MyBox from "./components/MyBox.vue";
const count = ref(0);
</script>

<template>
  <h1>我是App根组件</h1>
  <!--
    传props时，属性名可以使用驼峰命名法，也可以使用短横线命名法。
      但是，接收props时，短横线命名法的属性名会被转换为驼峰命名法。
  -->
  <MyBox :count="count" :firstName="`Taffy`" />
  <button @click="count++">App的按钮</button>
</template>

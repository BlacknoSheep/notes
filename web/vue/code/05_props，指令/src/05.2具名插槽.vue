<template>
  <h1>我是App组件</h1>
  <MyWarpper>
    <!--
      具名插槽
        v-slot:xx 或者 #xx
      不起名的插槽是默认插槽，使用默认的 #default
    -->
    <template v-slot:aa>AA</template>
    <template #bb>BB</template>
    <!-- 用于替换默认插槽的内容 -->
    <span>传给默认插槽的内容</span>
  </MyWarpper>
</template>

<script setup>
import MyWarpper from "./components/MyWarpper.vue";
</script>

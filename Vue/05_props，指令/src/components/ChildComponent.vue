<template>
  <h2>我是ChildComponent组件</h2>
  <slot :child_msg="child_msg"></slot>
</template>

<script setup>
const child_msg = "我是子组件作用域的数据";
</script>

<style scoped>
* {
  color: orange;
}
</style>

<template>
  <div class="layout">
    <Menu></Menu>
    <div class="right">
      <Header></Header>
      <Content></Content>
    </div>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Menu from "./Menu.vue";
import Content from "./Content.vue";
</script>

<style scoped>
.layout {
  width: 100%;
  height: 500px;
  display: flex;
  border: 1px solid #ccc;
}
.right {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="content">
    <div class="line" v-for="item in 100">{{ item }}</div>
  </div>
</template>

<script setup></script>

<style scoped>
.content {
  height: 450px;
  overflow: auto;
  flex-shrink: 0;
}
.line {
  height: 30px;
  line-height: 30px;
  margin: 5px;
  border: 1px solid #ccc;
  flex-shrink: 0;
}
</style>

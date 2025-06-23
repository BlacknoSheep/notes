<script setup>
// 动态设置class
const classes1 = ["box1", "box2", "box3"];
const classes2 = {
  box1: false,
  box2: true,
  box3: true,
};

// 动态设置样式
const style1 = {
  width: "100px",
  height: "100px",
  backgroundColor: "#bfa",
};
</script>

<template>
  <div :class="classes2"></div>
  <hr />
  <div :style="style1"></div>
</template>

<style scoped>
.box1 {
  width: 100px;
  height: 100px;
  background-color: red;
}
.box2 {
  width: 100px;
  height: 100px;
  border: 10px solid green;
}
</style>

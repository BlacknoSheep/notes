<script setup>
import my_box from "./components/my_box.vue"; // 引入的组件会自动注册
</script>

<template>
  <div class="app">
    <h1>App</h1>
    <div class="box1">App中的box1</div>
    <h2>App</h2>
    <my_box></my_box>
  </div>
</template>

<style scoped>
/*
  可以直接通过style标签写样式
  style中的样式是全局样式，会影响所有的组件

  可以为style标签添加一个scoped属性，这样样式将会成为局部样式，只会影响当前组件
    vue会自动为组件的所有元素生成一个随机的属性，形如 data-v-7a7a37b1
    然后在所有选择器最后添加 [data-v-7a7a37b1]

  注意：随机生成的属性，除了会添加到当前组件的所有元素中，
    还会添加到当前组件引入的其他组件（my_box）的根元素中。
      这样做是为了可以通过父元素为子元素设置样式
    若被引入的组件具有多个根元素，则均不会添加该属性
*/
h1 {
  background-color: #bfa;
}

.box1 {
  width: 100px;
  height: 100px;
  background-color: yellow;
}

/*
  不使用deep：.app h2[data-v-7a7a37b1]
  使用deep：.app[data-v-7a7a37b1] h2
*/
.app :deep(h2) {
  background-color: aqua;
}

/* 也可以设置全局样式 */
:global(div) {
  border: 1px red solid;
}
</style>

<!-- 可以再添加全局样式 -->
<!-- <style>
div {
  border: 1px red solid;
}
</style> -->

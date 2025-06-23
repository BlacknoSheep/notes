<script setup>
import my_box2 from "./components/my_box2.vue";
</script>

<template>
  <div class="app">
    <!-- 类名需要通过变量获取 -->
    <div :class="$style.box1">app的box1</div>
    <my_box2></my_box2>
  </div>
</template>

<!--
  css模块
    - 会自动对模块的类名进行哈希化，不同组件中的类名不会冲突
    - 在模板中通过 $style.类名 的方式获取类名
    - 也可以通过 module="xxx"，来替换 $style 为 xxx，即通过 xxx.类名 的方式获取类名
-->
<style module>
.box1 {
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>

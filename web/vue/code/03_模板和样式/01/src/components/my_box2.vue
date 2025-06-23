<script setup></script>
<template>
  <div>
    <div :class="$style.box1">我是my_box2中的box1</div>
  </div>
</template>

<style module>
.box1 {
  width: 100px;
  height: 100px;
  background-color: green;
}
</style>

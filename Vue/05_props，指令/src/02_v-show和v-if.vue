<script setup>
import { ref } from "vue";
const isShow = ref(true);
</script>

<template>
  <h1>我是App根组件</h1>

  <!--
    v-show：控制元素是否显示（通过display属性来实现）
      - 切换性能较高，但是初始渲染时会渲染所有元素

    v-if：控制元素是否渲染（通过添加/移除元素来实现）
      - 切换性能较低，但是初始渲染时只渲染需要显示的元素
      - v-if 可以与 v-else-if 和 v-else 配合使用
      - v-if 可以配合 template 标签使用
        - template 标签不会被渲染到页面中
  -->
  <button @click="isShow = !isShow">切换</button>
  <div v-show="isShow">v-show 内容</div>
  <hr />
  <div v-if="isShow">v-if 内容</div>
  <div v-else>v-else 内容</div>
  <hr />
  <template v-if="isShow">
    <h3>第一行</h3>
    <h3>第二行</h3>
  </template>
</template>

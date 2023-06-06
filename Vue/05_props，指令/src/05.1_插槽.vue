<template>
  <h1>我是App组件</h1>
  <!--
    希望在父组件中指令子组件中的内容
        - 可以通过 slot 实现
            <MyButton>App插槽的入口</MyButton>
            <slot></slot>  // 插槽的出口
        - 插槽可以传任何内容（文本、标签、组件）
        - 插槽中的组件位于父组件的作用域中
            如：A组件位于App组件的作用域中，可以访问到App中的变量
  -->
  <MyButton>App给的文字</MyButton>
  <MyButton>
    <A :name="name"></A>
  </MyButton>
</template>

<script setup>
import MyButton from "./components/MyButton.vue";
import A from "./components/A.vue";
const name = "Taffy";
</script>

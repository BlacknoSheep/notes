<!-- 多根组件 -->
<template>
  <h2>我是C2组件</h2>
  <h2 :class="$attrs.class" :style="$attrs.style">我也是C2组件</h2>
  <h3 :="$attrs">我是C2的h3</h3>
  <!--
    在模板中，可以通过 $attrs 来访问透传过来的属性
        可以手动指定透传过来的属性要添加到哪些元素上
  -->
  {{ $attrs }}
</template>

<script setup>
import { useAttrs } from "vue";
/*
  在 script 中，可以通过 useAttrs() 来获取透传过来的属性
*/
const attrs = useAttrs();
console.log(attrs);
</script>

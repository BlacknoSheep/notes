<script setup>
const html1 = `<i>html1</i>`;
</script>

<template>
  <!--
    - 在模板中，可以直接访问到组件中声明的变量
    - 除了组件中的变量外，还有一些全局变量也可以访问
    - 可以通过 app.config.globalProperties.xxx = xxx 的方式来添加全局变量

    - 使用插值时（{{ xxx }}），只能使用有返回值的表达式
    - 插值实际上就是在修改元素的textContent属性（标签会被转义）

    指令：
      - 指令是由vue提供的一些特殊属性，以v-开头
      - v-text：将表达式的值作为元素的textContent插入，作用同{{ xxx }}
      - v-html：将表达式的值作为元素的innerHTML插入，有xss风险
  -->
  <h1>{{ Math.random() }}</h1>
  <div>{{ html1 }}</div>
  <div v-text="html1"></div>
  <div v-html="html1"></div>
</template>

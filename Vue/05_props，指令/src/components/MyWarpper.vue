<template>
  <div>
    <!-- 具名插槽 -->
    <h1><slot name="aa">h1默认值</slot></h1>
    <h2><slot name="bb">h2默认值</slot></h2>
    <!-- 不指定name属性的插槽是默认插槽（使用默认的name="default"） -->
    <slot>默认插槽的默认值</slot>
  </div>
</template>

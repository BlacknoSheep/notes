<script setup>
/*
  父组件可以通过props向子组件传递数据。
  父组件传递给子组件的数据是只读的，子组件不能修改。
*/
// const props = defineProps(["count", "firstName"]);

const props = defineProps({
  // 限制类型，不匹配会报警告
  // count: Number,
  // firstName: String,

  // 校验和默认值
  count: {
    type: Number,
    default: 65535,
    required: true,
  },
  firstName: {
    type: String,
    default: "???",
    // 自定义校验器
    validator: (val) => {
      return val.length > 3;
    },
  },
});

console.log(props);
</script>

<template>
  <div>
    <hr />
    <h2>我是MyBox子组件 {{ count }}</h2>
    <hr />
  </div>
</template>

<style scoped>
h2 {
  color: tomato;
}
</style>

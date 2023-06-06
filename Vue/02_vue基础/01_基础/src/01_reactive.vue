<script>
export default {
  data() {
    // data中，this指向当前组件实例
    // console.log("data:", this);

    // 直接向组件实例中添加属性，该属性不会被vue代理，不会被转换为响应式数据
    this.name = "Taffy"; // 非响应式数据

    /*
      vm.$data 是实际的代理对象，vm.msg === vm.$data.msg
      可以通过 vm.$data 动态添加响应式数据（不推荐）
    */
    // this.$data.address = "bilibili"; // 此时组件还未创建完成，会报错

    // data()的返回值是一个对象，vue会对这个对象进行代理
    // 从而将其转换为响应式数据，响应式数据可直接通过组件实例访问（vm.msg）
    return {
      msg: "Hello Vue!", // 响应式数据
    };
  },

  created() {
    // 会在组件创建完毕后执行
    this.$data.address = "bilibili"; // 响应式数据
  },
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ name }}</h1>
  <h1>{{ address }}</h1>
</template>

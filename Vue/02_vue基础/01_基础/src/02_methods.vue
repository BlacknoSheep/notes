<script>
import MyButton from "./components/MyButton.vue";
import { shallowReactive } from "vue"; // 引入shallowReactive，用于创建浅层响应式对象

export default {
  data() {
    /*
      vue在构建响应式对象时，会逐层遍历对象的所有属性，将它们也加入响应式数据。
        这种方式称为深层响应式。
      可通过shallowReactive()函数创建浅层响应式对象。
        浅层响应式对象只会对对象的第一层属性进行响应式处理。
    */
    /* return {
      msg: "Hello Vue!",
      stu: {
        name: "永雏塔菲",
        age: 17,
        gender: "女",
      },
    }; */

    return shallowReactive({
      msg: "Hello Vue!",
      stu: {
        name: "永雏塔菲",
        age: 17,
        gender: "女",
      },
    });
  },

  components: {
    MyButton,
  },

  /*
    methods属性用于定义实例对象中的方法
      - 是一个对象，可以定义多个方法
      - 可直接通过组件实例来调用这些方法
      - methods中的方法，会自动绑定this为组件实例对象
  */
  methods: {
    test() {
      alert("test");
    },

    sum(a, b) {
      return a + b;
    },

    changeMsg() {
      this.msg = "新的消息";
    },
  },
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>{{ stu.name }} -- {{ stu.age }} -- {{ stu.gender }}</div>
  <hr />
  <MyButton></MyButton>
  <MyButton></MyButton>
  <hr />
  <div>{{ sum(5, 7) }}</div>
  <div><button @click="changeMsg()">修改msg</button></div>
</template>

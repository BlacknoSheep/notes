<script>
export default {
  data() {
    return {
      msg: "Hello Vue",
      stu: {
        name: "永雏塔菲",
        age: 17,
        gender: "女",
      },
    };
  },

  methods: {
    changeAge() {
      if (this.stu.age < 18) {
        this.stu.age = 18;
      } else {
        this.stu.age = 17;
      }
    },

    // 提示信息
    log() {
      console.log("页面被重新渲染了！");
    },
  },

  /*
    computed 用来指定计算属性
      - 计算属性会对数据进行缓存，只在其依赖的数据发生变化时才会重新求值
  */
  computed: {
    // info() {},  // 也可以这样写
    info: function () {
      console.log("info被重新计算了！");
      if (this.stu.age >= 18) {
        return "成年人";
      } else {
        return "未成年人";
      }
    },

    stuinfo: {
      /*
        - 使用时，可以直接使用stuinfo属性，不需要调用
        - 只有get()方法时，可以按上面的方式简写
        - 设置set()方法后，可使得计算属性可写，但是不建议这样做
      */
      get() {
        return this.stu.name + " -- " + this.stu.age + " -- " + this.stu.gender;
      },
      set(value) {
        // set()在计算属性被修改时调用
        console.log("stuinfo的set()被调用了！");
        this.stu.name = value;
      },
    },
  },
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ stuinfo }}</h1>
  <!-- 直接使用info属性，不需要调用 -->
  <div>评语：{{ info }}</div>
  <div>
    <button @click="changeAge()">改变年龄</button>
  </div>

  <!-- 只要页面被重新渲染就会执行 -->
  <div>{{ log() }}</div>
</template>

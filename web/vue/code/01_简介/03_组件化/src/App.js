// 引入组件
import count_button from "./components/count_button.js";

// 在外部文件中定义根组件
export default {
  data() {
    return {
      msg: "Hello Vue",
      count: 0,
    };
  },

  // 注册子组件
  components: {
    count_button,
    // count_button: count_button,  // ES6语法中，如果属性名和属性值相同，可以省略属性值
  },

  /*
    template是用字符串的形式定义模板的
      - 在项目运行时，这些字符串会被编译为js函数
  */
  template: `
  <h1>{{msg}}</h1>
  <count_button></count_button>
  <count_button></count_button>
  `,
};

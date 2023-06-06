// 自定义按钮组件
export default {
  data() {
    return {
      count: 0,
    };
  },
  template: `
  <div>
    <button @click='count++'>点我一下</button><span>{{count}}</span>
  </div>`,
};

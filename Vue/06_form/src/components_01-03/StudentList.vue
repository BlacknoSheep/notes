<template>
  <!-- {{ $attrs }} -->
  <table>
    <caption>
      学生列表
    </caption>
    <thead>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
        <th>地址</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(stu, index) in props.stuList">
        <td>{{ stu.id }}</td>
        <td>{{ stu.name }}</td>
        <td>{{ stu.age }}</td>
        <td>{{ stu.gender }}</td>
        <td>{{ stu.address }}</td>
        <td>
          <!-- 在模板中，可以通过 $emit 来触发自定义事件 -->
          <!-- <a href="#" @click.prevent="() => $emit(`delStuByIndex`, index)">删除</a> -->
          <!-- <a href="#" @click.prevent="() => emits(`delStuByIndex`, index)">删除</a> -->
          <a href="#" @click.prevent="delStuHandle(index)">删除</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
// 使用自定义属性时，最好通过 defineProps() 函数声明一下（这样才会出现在代码提示中）
// const props = defineProps(["stuList", "delStuByIndex"]); // 可以直接通过属性传函数
const props = defineProps(["stuList"]);
const emits = defineEmits(["delStuByIndex"]);

function delStuHandle(index) {
  // 删除指定索引的学生
  if (confirm("确定要删除吗？") === false) return;

  // props.delStuByIndex(index);

  // 通过触发自定义事件调用父组件的方法
  emits("delStuByIndex", index);
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

caption {
  font-size: 1.5em;
  font-weight: bold;
}

th,
td {
  border: 1px solid #ccc;
}
</style>

<template>
  <StudentList :stuList="stu_list" @delStuByIndex="delStuByIndex"></StudentList>
  <hr />
  <StudentForm @addStu="addStu"></StudentForm>
</template>

<script setup>
import { ref, provide } from "vue";
import StudentList from "./components/StudentList.vue";
import StudentForm from "./components/StudentForm.vue";

const STU_ARRAY = [
  { id: 1, name: "孙悟空", age: 20, gender: "男", address: "花果山" },
  { id: 2, name: "猪八戒", age: 19, gender: "男", address: "高老庄" },
  { id: 3, name: "沙和尚", age: 18, gender: "男", address: "流沙河" },
];
const stu_list = ref(STU_ARRAY);

function delStuByIndex(index) {
  // 删除指定索引的学生
  stu_list.value.splice(index, 1);
}

function addStu(new_stu) {
  // 添加新学生
  stu_list.value.push({
    id: stu_list.value.length ? stu_list.value.at(-1).id + 1 : 1,
    ...new_stu, // 展开运算符
  });
}

/*
  依赖注入：
    - 通过依赖注入，可以跨越多层组件向后代组件传递数据
    - 步骤：
      1. 设置依赖（provide）  provide(name, value)
      2. 注入数据（inject）  inject(name, defaultValue)
*/
provide("appProvide", { stu_list, delStuByIndex, addStu });
</script>

<style scoped></style>

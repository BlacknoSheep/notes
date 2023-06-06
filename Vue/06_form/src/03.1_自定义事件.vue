<template>
  <!--
    可以将组件中的方法以自定义事件的形式发送给其他组件
  -->
  <StudentList :stuList="stu_list" @delStuByIndex="delStuByIndex"></StudentList>
</template>

<script setup>
import { ref } from "vue";
import StudentList from "./components/StudentList.vue";

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
</script>

<style scoped></style>

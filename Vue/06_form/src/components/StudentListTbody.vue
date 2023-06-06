<template>
  <tbody>
    <tr v-for="(stu, index) in stu_list">
      <td>{{ stu.id }}</td>
      <td>{{ stu.name }}</td>
      <td>{{ stu.age }}</td>
      <td>{{ stu.gender }}</td>
      <td>{{ stu.address }}</td>
      <td>
        <a href="#" @click.prevent="delStuHandle(index)">删除</a>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
import { inject } from "vue";
const { stu_list, delStuByIndex } = inject("appProvide");

function delStuHandle(index) {
  // 删除指定索引的学生
  if (confirm("确定要删除吗？") === false) return;
  delStuByIndex(index);
}
</script>

<style scoped>
td {
  border: 1px solid #ccc;
}
</style>

<template>
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
    <StudentListTbody></StudentListTbody>
  </table>
</template>

<script setup>
import StudentListTbody from "./StudentListTbody.vue";
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

th {
  border: 1px solid #ccc;
}
</style>

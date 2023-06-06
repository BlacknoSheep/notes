<template>
  <button @click="arr.push('Taffy')">添加</button>
  <ul>
    <!-- <li v-for="item of arr">{{ item }}</li> -->
    <li v-for="(item, index) of arr">{{ index }} - {{ item }}</li>
  </ul>
  <hr />
  <!--
    数组内容发生变化时，v-for 会对变化前后的内容进行对比。
      - 默认按照索引顺序进行对比，无变化的项不更新
        - 如 push 只更新被添加到末尾的那一项
        - 而 unshift 则会更新所有项
      - 可以通过 key 为元素指定唯一标识，此时对比时会按照相同的 key 进行对比
  -->
  <button @click="users.unshift({ id: 4, name: 'Taffy', age: 17 })">添加</button>
  <div v-for="item of users">
    {{ item.id }} - {{ item.name }} - {{ item.age }}
    <input type="text" />
  </div>
  <div>
    <h2>使用key</h2>
    <div v-for="{ id, name, age } of users" :key="id">
      {{ id }} - {{ name }} - {{ age }}
      <input type="text" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const arr = ref(["孙悟空", "猪八戒", "沙和尚"]);
const users = ref([
  { id: 1, name: "孙悟空", age: 50 },
  { id: 2, name: "猪八戒", age: 40 },
  { id: 3, name: "沙和尚", age: 30 },
]);
</script>

<style scoped>
ul {
  list-style: none;
}
</style>

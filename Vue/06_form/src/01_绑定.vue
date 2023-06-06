<template>
  <form @submit.prevent="submitHandler">
    <!--
      这里将 value属性与 text变量进行了绑定（单向绑定）
        value变化时，text会随之改变；
        但text变化时，value不会随之改变
    -->
    <fieldset>
      <legend>单向绑定</legend>
      <input type="text" @input="(event) => (text = event.target.value)" />
      <input type="text" @input="(event) => (text = event.target.value)" />
      <button>提交</button>
    </fieldset>
  </form>
  <form @submit.prevent="submitHandler2()">
    <!-- 双向绑定 -->
    <fieldset>
      <legend>双向绑定</legend>
      <input type="text" @input="(event) => (text2 = event.target.value)" :value="text2" />
      <input type="text" @input="(event) => (text2 = event.target.value)" :value="text2" />
      <button>提交</button>
    </fieldset>
  </form>
</template>

<script setup>
let text = "";
function submitHandler() {
  console.log(text);
}

import { ref } from "vue";
const text2 = ref("默认值");
function submitHandler2() {
  console.log(text2);
}
</script>

<style scoped></style>

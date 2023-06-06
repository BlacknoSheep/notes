<template>
  <!--
    v-model 指令可以快速完成表单的双向绑定
  -->
  <form>
    <fieldset>
      <legend>text 的双向绑定</legend>
      <input type="text" v-model="text" />
      <!-- 二者等价 -->
      <input type="text" @input="(event) => (text = event.target.value)" :value="text" />
      <div class="result">text: {{ text }}</div>
    </fieldset>

    <fieldset>
      <legend>checkbox 的双向绑定</legend>
      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox">{{ checked }}</label>
      <br />
      <input type="checkbox" id="checkbox2" v-model="checked2" true-value="是" false-value="否" />
      <label for="checkbox2">{{ checked2 }}</label>
    </fieldset>

    <fieldset>
      <legend>多个 checkbox</legend>
      <input type="checkbox" name="hobby" value="足球" id="soccer" v-model="hobbies" />
      <label for="soccer">足球</label>
      <input type="checkbox" name="hobby" value="羽毛球" id="badminton" v-model="hobbies" />
      <label for="badminton">羽毛球</label>
      <input type="checkbox" name="hobby" value="篮球" id="basketball" v-model="hobbies" />
      <label for="basketball">篮球</label>
      <div class="result">hobbies: {{ hobbies }}</div>
    </fieldset>

    <fieldset>
      <legend>radio</legend>
      <input type="radio" name="gender" id="male" value="男" v-model="gender" />
      <label for="male">男</label>
      <input type="radio" name="gender" id="female" value="女" v-model="gender" />
      <label for="female">女</label>
      <div class="result">gender: {{ gender }}</div>
    </fieldset>

    <fieldset>
      <legend>select</legend>
      <select v-model="selection">
        <!-- ios系统下，若默认值为空，则会导致第一个选项选不了，可通过添加一个无效选项来避免这个问题 -->
        <option disabled value="">请选择...</option>
        <option value="张维维">张维维</option>
        <option value="孙笑川">孙笑川</option>
        <option value="丁真">丁真</option>
      </select>
      <div class="result">selection: {{ selection }}</div>
    </fieldset>

    <!--
      v-model 修饰符
        .lazy：在失去焦点或按下回车时才更新数据（change而非input）
        .number：将输入的内容转换为数字类型
        .trim：去除输入内容的首尾空格
    -->
    <fieldset>
      <legend>修饰符</legend>
      <div>输入结果：{{ temp }}</div>

      <div>.lazy: <input type="text" v-model.lazy="temp" /></div>
      <div>.number: <input type="text" v-model.number="temp" /></div>
      <div>.trim: <input type="text" v-model.trim="temp" /></div>
    </fieldset>
  </form>
</template>

<script setup>
import { ref } from "vue";
const text = ref("");

const checked = ref(false);
const checked2 = ref("否");

const hobbies = ref([]);

const gender = ref("男");

// const selection = ref("孙笑川");
const selection = ref("");

const temp = ref("");
</script>

<style scoped>
.result {
  color: red;
}
</style>

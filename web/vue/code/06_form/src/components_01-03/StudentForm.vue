<template>
  <form @submit.prevent="submitHandler">
    <div>
      <label for="name">姓名：</label>
      <input type="text" id="name" v-model="new_stu.name" />
    </div>
    <div>
      <label for="age">年龄：</label>
      <input type="number" id="age" min="0" max="150" v-model="new_stu.age" />
    </div>
    <div>
      性别：
      <input type="radio" name="gender" value="男" v-model="new_stu.gender" />男
      <input type="radio" name="gender" value="女" v-model="new_stu.gender" />女
    </div>
    <div>
      <label for="address">地址：</label>
      <input type="text" id="address" v-model="new_stu.address" />
    </div>
    <div>
      <button>添加</button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
const emits = defineEmits(["addStu"]);

// 新学生的信息
const new_stu = reactive({
  name: "",
  age: 0,
  gender: "男",
  address: "",
});

function submitHandler() {
  // console.log(new_stu);
  // 将新学生信息传给父组件
  //   emits("addStu", Object.assign({}, new_stu));
  emits("addStu", { ...new_stu });

  // 清空表单
  new_stu.name = "";
  new_stu.age = 0;
  new_stu.gender = "男";
  new_stu.address = "";
}
</script>

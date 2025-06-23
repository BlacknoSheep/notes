<script setup>
import { ref, reactive } from "vue";
const imgPath = ref("/imgs/bilibili_haru.png");

function changeImg() {
  imgPath.value = "/imgs/bilibili_natsu.png";
}

const box1 = {
  id: "box1",
  class: "box",
  style: {
    width: "100px",
    height: "100px",
    backgroundColor: "red",
  },
};

const isDisabled = true;

const attrName = "name";
const attrValue = "sss";
</script>

<template>
  <!--
    public文件夹下的内容会直接复制到dist目录下。src下的内容被vite打包后会放到dist目录下的assets文件夹中。
      - 访问图片时
        方式一："/imgs/bilibili.png" 或 "imgs/bilibili.png"  注意：斜杠前不能有点
        方式二："../imgs/bilibili.png"
  -->
  <img src="/imgs/bilibili_haru.png" />

  <hr />
  <!--
    动态设置属性值时，需要使用v-bind指令
      - v-bind 可以简写为 : 
  -->
  <!-- <img v-bind:src="imgPath" /> -->
  <img :src="imgPath" />
  <button @click="changeImg">切换图片</button>

  <hr />
  <!--
    可以动态绑定多个属性
  -->
  <!-- <div v-bind="box1"></div> -->
  <div :="box1"></div>

  <hr />
  <!--
    设置布尔值属性时：
      若值为true（或可以转换为true），则会添加该属性；
      若值为false（或可以转换为false），则不会添加该属性；
      例外：空字符串 "" 时也会添加该属性
  -->
  <input type="text" :disabled="isDisabled" />

  <hr />
  <!--
    动态设置属性名
  -->
  <div :[attrName]="attrValue"></div>
</template>

<template>
  <h1>{{ count }}</h1>
  <!--
    为元素绑定事件
      - 格式
        v-on:click="handler"
        @click="handler"
      - 事件处理器 (handler) 的值可以是：
        1. 内联事件处理器：直接执行 JavaScript 语句 (与 onclick 类似)。
          回调函数的参数由自己指定。
        2. 方法事件处理器：调用处理事件的函数。
          回调函数的参数由 Vue 自动传入。
        vue 区分两种处理器的方式：
          检查事件的值是否是合法的 js 标识符或属性访问路径（如 foo，foo.bar），
            如果是，则认为是方法事件处理器，
            否则认为是内联事件处理器。
  -->
  <!-- 内联事件处理器 -->
  <button @click="++count">+1</button>
  <button @click="plus2()">+2</button>
  <!-- 方法事件处理器 -->
  <button @click="plus2">+2</button>

  <!-- 事件处理器的参数 -->
  <hr />
  <button @click="clickHandler">方法事件处理器</button>
  <button @click="clickHandler($event)">内联事件处理器</button>

  <hr />
  <div class="box1" @click="boxHandler2(`box1`)">
    box1
    <div class="box2" @click="boxHandler2(`box2`)">
      box2
      <div class="box3" @click.stop="boxHandler2(`box3`)">box3</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
function plus2() {
  count.value += 2;
}

function clickHandler(event) {
  /*
    方法事件处理器的回调函数的参数就是 DOM 中原生的事件对象。
    通过该对象，可以获取：触发事件的对象、事件类型、鼠标位置、键盘按键等信息。

    在内联事件处理器中，可以通过 $event 参数获取原生事件对象。
  */
  console.log("clickHandler()被调用了！");
  console.log("参数：", event);
}

function boxHandler(event, text) {
  event.stopPropagation(); // 传统的阻止事件传播的方式
  alert(text);
}

function boxHandler2(text) {
  alert(text);
}
</script>

<style scoped>
.box1 {
  width: 100px;
  height: 100px;
  background-color: #bfa;
}

.box2 {
  width: 80px;
  height: 80px;
  background-color: pink;
}

.box3 {
  width: 60px;
  height: 60px;
  background-color: orange;
}
</style>

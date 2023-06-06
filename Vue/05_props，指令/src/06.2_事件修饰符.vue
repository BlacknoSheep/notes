<template>
  <!--
    事件修饰符
      .stop  停止事件的传播（包括捕获和冒泡）
      .capture  在捕获阶段触发事件
      .prevent  取消默认行为（如点击超链接后跳转等）
      .self  只有事件由自身触发时才有效
      .once  绑定一次性事件
      .passive  主要用于提升滚动事件的性能（如鼠标滚轮、移动端滑动）

    按键修饰符、鼠标按键修饰符
      .enter 等
  -->
  <!-- .stop  停止事件的传播（包括捕获和冒泡） -->
  <div class="wrapper">
    <div class="caption">.stop</div>
    <div class="box1" @click="clickHandler(`box1`)">
      box1
      <div class="box2" @click.stop="clickHandler(`box2`)">
        box2
        <div class="box3" @click="clickHandler(`box3`)">box3</div>
      </div>
    </div>
  </div>
  <!-- .capture  在捕获阶段触发事件 -->
  <div class="wrapper">
    <div class="caption">.capture</div>
    <div class="box1" @click.capture="clickHandler(`box1`)">
      box1
      <div class="box2" @click="clickHandler(`box2`)">
        box2
        <div class="box3" @click.capture.stop="clickHandler(`box3`)">box3</div>
      </div>
    </div>
  </div>
  <!-- .self  只有事件由自身触发时才有效 -->
  <div class="wrapper">
    <div class="caption">.capture</div>
    <div class="box1" @click.self="clickHandler(`box1`)">
      box1
      <div class="box2" @click="clickHandler(`box2`)">
        box2
        <div class="box3" @click="clickHandler(`box3`)">box3</div>
      </div>
    </div>
  </div>
</template>

<script setup>
function clickHandler(text) {
  alert(text);
}
</script>

<style scoped>
.wrapper {
  margin-bottom: 20px;
}

.caption {
  color: #a00;
}

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

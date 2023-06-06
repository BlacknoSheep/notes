<script setup>
import { ref } from "vue";
const activeIndex = ref(0); // 0：球员，1：球队
</script>

<template>
  <!-- 选项卡的外部容器 -->
  <div class="tab_warpper">
    <!-- 选项卡的头部 -->
    <header class="tab_head">
      <!-- 定义两个按钮 -->
      <div class="tab_button" :class="{ active: activeIndex === 0 }" @click="activeIndex = 0">热门球员</div>
      <div class="tab_button" :class="{ active: activeIndex === 1 }" @click="activeIndex = 1">热门球队</div>
    </header>
    <!-- 选项卡的主体 -->
    <div class="main">
      <!--
        v-show：控制元素的显示和隐藏
          v-show是通过display来控制元素的显示和隐藏的
      -->
      <!-- 球员 -->
      <div class="member" v-show="activeIndex === 0">
        <div class="tab_list">
          <div class="tab_item">
            <!-- 图片 -->
            <div class="photo">
              <img src="/images/messi.png" alt="梅西" />
              <span>1</span>
            </div>
            <!-- 描述 -->
            <div class="desc">
              <span>梅西</span>
              <div class="hot_bar">
                <div class="inner">433760热度</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 球队 -->
      <div class="team" v-show="activeIndex === 1">
        <div class="tab_list">
          <div class="tab_item">
            <!-- 图片 -->
            <div class="photo">
              <img src="/images/法国.jpg" alt="法国" />
              <span>1</span>
            </div>
            <!-- 描述 -->
            <div class="desc">
              <span>法国</span>
              <div class="hot_bar">
                <div class="inner">333760热度</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab_warpper {
  width: 800px;
  background-color: rgb(45, 83, 211);
  padding: 20px;
}

.tab_head {
  display: flex;
  border-radius: 10px;
  /* tab_head由子元素撑开，子元素为矩形，角落会溢出 */
  overflow: hidden;
}

.tab_button {
  background-color: #fff;
  flex: auto;
  padding: 10px 0;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
}

.active {
  background-color: rgb(187, 3, 52);
  color: #fff;
  transition: 0.3s;
}

.tab_list {
  margin: 20px;
}

.tab_item {
  display: flex;
  margin-bottom: 20px;
}

.photo {
  width: 150px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.photo img {
  width: 100%;
  vertical-align: top;
}

.photo span {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-color: rgb(245, 102, 1);
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  /* 居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 20px;
}

.desc {
  font-size: 30px;
  color: #fff;
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 30px;
}

.hot_bar {
  border-radius: 20px;
  background-color: rgb(3, 37, 103);
  text-indent: 0.5em;
  overflow: hidden;
}

.inner {
  width: 10%;
  background-image: linear-gradient(90deg, rgb(187, 3, 52) 50%, rgb(66, 2, 12));
  border-radius: 20px;
  /* 文字不换行 */
  white-space: nowrap;
}
</style>

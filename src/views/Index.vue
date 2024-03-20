<template>
  <div class="common-layout">
    <el-container class="all">
      <!-- 头部 -->
      <el-header>
        <common-header/>
      </el-header>
      <!-- 侧边栏和主体 -->
      <el-container class="other">
        <el-aside class="custom-aside" :width="useMenu.isCollapse?'0px':'200px'">
        <common-aside/>
      </el-aside>
        <el-main :style="ganttChartStyle">
          <!-- <common-plan/> -->
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>


<script setup>
import { computed } from "vue";
import { useRoute } from 'vue-router';
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import  useUserMenu  from "@/store/modules/menu";
import CommonPlan from "../components/CommonPlan.vue";
import useUserStore from "../store/modules/user";
// console.log(useUserMenu().isCollapse+'1')
const useMenu = useUserMenu()
const userStore = useUserStore()

// 页面加载或创建时从localStorage恢复数据
userStore.name = localStorage.getItem('name') || '';

const route = useRoute();

const ganttChartStyle = computed(() => {
  if (route.name === 'testGtt' || route.name ==='viewBasePlan' || route.name === 'moveData' || route.name === 'gtt1') {
    return {
      height: 'calc(100vh - 60px)',
      overflowY: 'auto'
    };
  }
  return {};
});

</script>
<style>

</style>

<style scoped>
.all {
  height: 100vh;
  overflow: hidden; /* 隐藏.all的滚动条 */
}

.el-aside {
  background-color: #f1f4f6;
  height: 100%;
  /*使侧边栏固定 */
   /* position: fixed;   */
  /* top: 60px; 由于顶部的高度是60px，所以这里设置为60px */
  margin-top: 60px;
  left: 0;
  /* z-index: 1; 保证侧边栏在内容上方 */
}

.el-header {
  background-color: #f1f4f6;
  height: 60px;
  position: fixed;  /* 使顶部固定 */
  top: 0;
  left: 0;
  width: 100%;
  /* overflow-x: auto; */
  /* z-index: 2; 保证头部在侧边栏和内容上方 */
}

.el-main {
   /*height: calc(100vh - 60px);  考虑到顶部的高度是60px */
  height: 100vh;
  padding: 0px;
  margin: auto;
  margin-top: 60px; /* 设置margin-top使内容从头部下方开始 */
  /* margin-left: 200px; */
  
   /* 如果侧边栏是展开的，设置左边距。如果侧边栏是收起的，您可能需要动态更改这个值 */
  overflow-y: auto; /* 允许内容区域滚动 */
  /* z-index: 0; */
}

</style>
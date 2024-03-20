<template>
  <div class="container">
    <div class="left">
        <img src="../assets/logo.svg" alt="" @click="toDefault">
        <h3 @click="toDefault">APS</h3>
        <button @click="useMenu.isCollapse = !useMenu.isCollapse">
            <el-icon>
                <Fold />
            </el-icon>
        </button>
    </div>
    <div class="right">
        <el-tag
            :key="tag.name"
            v-for="(tag, index) in tags"
            :closable=true
            :disable-transitions="false"
            :class="changeColor(tag)"
            @click="changeMenu(tag)"
            @close="handleClose(tag, index)"
            :data-tag-name="tag.name"
            >
            {{ tag.meta.title }}
        </el-tag>
    </div>
  </div>
</template>

<script setup>
import {watch,onMounted} from'vue'
import { useRouter, useRoute } from "vue-router";
import {closeConnect} from '../utils/sseService'
import {stopTimer} from '../utils/timerControl'
const router = useRouter()
const route = useRoute();


import useUserMenu from "@/store/modules/menu"
import useUserStore from "@/store/modules/user"
import UseScheduling from "@/store/modules/scheduling"
const useMenu = useUserMenu()
const schedule = UseScheduling()

// useMenu.tabsList = JSON.parse(localStorage.getItem('tabs')) //一刷新locaStorage也变了，也重新刷新了
const tags = useMenu.tabsList;

// const tags = JSON.parse(localStorage.getItem('tabs'))

// console.log(tags, '1123')

onMounted(() => {
    const rightContainer = document.querySelector('.right');

    if (rightContainer) {
    rightContainer.addEventListener('wheel', (event) => {
        // 通常情况下，event.deltaY 是垂直滚动的量，我们用这个量来作为水平滚动
        const toScroll = event.deltaY;
        rightContainer.scrollLeft += toScroll;

        // 阻止默认的滚动事件处理，因为我们已经处理了滚动
        event.preventDefault();
    }, { passive: false });
    }

})

const changeMenu = (item) => {
    router.push({ name: item.name });
      
};

const handleClose = (tag, index) => {
    // 处理vuex中的tabslist
    useMenu.closeTab(tag);
    
    // 重新获取 tabsList 的当前状态
    const currentTabs = useMenu.tabsList;
    // const currentTabs = tags;
    const length = currentTabs.length - 1;

    // 做第一个判断
    if (tag.name !== route.name) {
        return;
    }
    //如果关闭的是排程这个标签页,给后端发送一个请求
    if (tag.name == 'schedule') {
        useUserStore().isSchedule = false
        stopTimer()
        closeConnect()
        // console.log('关闭排程标签页，向后端发送请求')
        schedule.closeLock().then((res) => {
            
        }).catch(error => {
            
        })
    }

    // 如果你关闭的是最后一个标签
    if (index === length + 1) {
        // 如果是唯一的标签，那么跳转到默认页面或者不跳转，根据你的业务需求
        if (currentTabs.length === 0) {
            router.push({ path: '/default' }); // 使用你的默认页面名
        } else {
            router.push({ name: currentTabs[length].name });
        }
    } else {
        router.push({ name: currentTabs[index].name });
    }
};

const changeColor = (tag) => {
    if (route.name === tag.name) {
        return 'tag-selected'; // 根据需要设置选中状态的样式类名
      } else {
        return 'tag-normal'; // 根据需要设置普通状态的样式类名
      }
}
function toDefault() {
    router.push({path:'./default'})
}
</script>

<style lang="less">
    .el-header {
        --el-header-padding: 0px;
    }
    .el-tag{
        --el-tag-text-color:#fff
    }
</style>

<style lang="less" scoped>
.container{
    display: flex;
}
.left{
    display: flex;
    width: 200px;
    align-items: center;
    position: relative;
    height: 60px;
    img{
        width: 30px;
        margin-left: 40px;
        cursor: pointer;
    }
    h3{
        color: #005BAC;
        margin: 0 0 0 5px;
        // line-height: 60px;
        cursor: pointer;
        /* margin: 0 auto; */
    }
    button{
            border: none;
            position: absolute;
            right: 0;
            padding: 0;
            line-height: 60px;
            // box-sizing: border-box;
            align-items: center;
            justify-content: center;
            background-color: #f1f4f6;
            .el-icon{
            // margin-left: 25px;
            font-size: 14px;
            cursor: pointer;
            height: 16px;
            padding: 20px;
        }
    }
    button:hover{
        background-color: #1D89E9;
        color:#fff
    }
}


.right{
    align-items: center;
    // width: 100%;
    flex: 1;

    display: flex; /* 使用flex布局 */
    overflow-x: auto; /* 允许水平滚动 */
    overflow-y: hidden; /* 隐藏垂直滚动 */
    white-space: nowrap; /* 阻止元素换行 */
    margin-right: -30px; /* 可能需要调整，以防止最后一个标签被遮挡 */
    padding-right: 30px; /* 与上面的margin-right相对应，以保持内容的对齐 */
    // padding-bottom: px; /* 给滚动条留出空间，数值可能需要调整 */

    
    .el-tag{
        //display: inline-block;
        display: inline-flex;
        // width: 120px;
        height: 60px;
        border-radius: 0%;
        border: none;
        // padding: 20px 15px;
        padding: 20px 12px 20px 20px;
        font-size: 14px;
        font-family: Microsoft YaHei UI;
        font-weight: 400;
        letter-spacing: 0em;
        align-items: center;
        color: #000;
        background-color: #f1f4f6;
        span{
            margin: 0 auto;
        }
        .el-icon{
            color: #fff;
        }
        // .el-tag__close{
        //     color: red;
        // }
        
    }
    .el-tag:hover{
        background-color: #0053b5;
        color: #fff;
        cursor: pointer;
    }
    .tag-selected {
        /* 选中状态的样式 */
        background-color: #0053b5;
        color: #fff;
    }

    .tag-normal {
        /* 普通状态的样式 */
        background-color: #f1f4f6;
        color: #000;
    }
    
}
.right:hover{
    &::-webkit-scrollbar {
    display: block; /* 显示滚动条 */
    // width: 2px; /* 滚动条宽度 */
    height: 6px;
    // cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* 滚动条“拇指”的颜色 */
    border-radius: 10px; /* 滚动条“拇指”的边框圆角 */
    // cursor: pointer;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* 鼠标悬停时滚动条“拇指”的颜色 */
    cursor: pointer;
  }
}




</style>
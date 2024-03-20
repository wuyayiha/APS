<template>
  <div class="bgc">
    <img
      src="../assets/bg-light-275f0d57.jpg"
      width="100%"
      height="100%"
      alt=""
    />
  </div>
  <div class="one">
    <div class="left">
      <img src="../assets/logo+en.svg" alt="" />
    </div>
    <div class="right">
      <img src="../assets/app_title.svg" width="155px" height="366.71px" />
      <!-- <h2>高级生产与排程系统APS</h2> -->
      <el-form :model="form" @keydown.enter="submitLogin">
        <el-form-item>
          <el-input v-model="form.name" id="name" placeholder="用户名" />
        </el-form-item>
        <el-form-item class="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            show-password
            id="password"
          />
        </el-form-item>
        <a href="javascript:;" @click="open"><span>忘记密码?</span></a>
      </el-form>

      <el-button
        type="primary"
        @click.prevent="submitLogin"
        style="font-size: 12px"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { h, reactive, ref, watch } from 'vue'
import { login } from '../api/login'
import Cookies from 'js-cookie'
// import router from '../router/index'
import { setToken } from '@/utils/auth'
import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
import useUserMenu from '../store/modules/menu'
// import '../style.css'

const userStore = useUserStore()
const userMenu = useUserMenu()
const route = useRoute() //用于获取和访问当前路由的信息
const router = useRouter() //用于执行路由导航的操作

// do not use same name with ref
const form = reactive({
  name: '',
  password: ''
})

const open = () => {
  ElMessageBox({
    title: '提示',
    message: h('p', null, [h('span', null, '请联系飞书管理员')]),
    confirmButtonText: '确定'
  })
}

const redirect = ref(undefined)

watch(
  route,
  (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect
  },
  { immediate: true }
)

function submitLogin() {
  // 调用action的登录方法
  userStore.login(form.name, form.password).then((res) => {
      const query = route.query
      const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
      sessionStorage.removeItem('tabs')
      userMenu.tabsList = []
      // window.location.reload();
      router.push({ path: redirect.value || '/', query: otherQueryParams })
      // router.push({ path: '/default'});
    })
    .catch((error) => {
      ElMessage.error('用户名或密码错误')
    })
}
</script>

<style>
.el-message-box__btns > .el-button--primary {
  background-color: #409eff;
}
</style>

<style scoped>
body {
  height: 100vh;
}

.common-layout {
  height: 100%;
}
.one {
  display: flex;
  height: 100vh;
  /* background-color: #2ba2f9; */
  margin: auto;
  flex-direction: row;
}
.bgc {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}
.bgc > img {
  width: 100%; /* 宽度占满容器 */
  height: 100%; /* 高度占满容器 */
  object-fit: cover;
}
.right > img {
  width: 366.71px;
  height: 155px;
}
.right {
  /* z-index:1; */
  position: absolute;
  right: 0;
  width: 40%;
  /* flex: 4; */
  height: 100%;
  box-sizing: border-box;
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  background-color: #fff;
}
.left {
  display: flex;
  width: 60%;
  align-items: center;
}
.left > img {
  width: 150px;
  height: 178.64px;
  margin: auto;
}

.el-form {
  /* margin: 150px 0px 160px 0px; */
  margin: 0;
  padding: 0 0 20px 0;
  /* text-align: center; */
}
h2 {
  color: #0053b5;
}

.password {
  margin-bottom: 0;
}
.el-input {
  width: 366px;
  height: 52px;
  box-sizing: border-box;
  --el-input-bg-color: #f1f4f6;
  border: none;

  /* background-color: rgb(133, 133, 133); */
  /* background-color: red; */
}
.el-button {
  /* margin-top: 50px; */
  text-align: center;
  margin: 0px auto;
  height: 50px;
  width: 366px;
  font-weight: 700;
}
a > span {
  width: 330px;
  height: 20px;
  /* margin-left: 308px; */
  font-size: 12px;
  /* text-decoration: none; */
}
a {
  float: right;
  text-decoration: none;
}

.el-form-item__label {
  width: 80px !important;
}

a > span {
  color: #1d89e9;
}
</style>

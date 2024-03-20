<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <!-- 一级菜单 -->
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren()"
      :key="item.path"
      @click="clickMenu(item)"
      class="menuItem"
    >
      <span>{{ item.meta.title }}</span>
      <el-tooltip
        class="box-item"
        effect="light"
        :content="item.isFavorite ? '取消常用功能' : '设为常用功能'"
        placement="right"
      >
        <el-icon
          :class="{ star: true, 'star-visible': item.isFavorite }"
          @click.stop="toggleFavorite(item)"
        >
          <template v-if="item.isFavorite">
            <StarFilled />
            <!-- 填充的星星图标 -->
          </template>
          <template v-else>
            <Star />
            <!-- 空心星星图标 -->
          </template>
        </el-icon>
      </el-tooltip>
    </el-menu-item>

    <!-- 二级菜单 -->
    <el-sub-menu
      :index="item.path"
      v-for="item in hasChildren()"
      :key="item.path"
    >
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
      <el-menu-item
        :index="subItem.path"
        v-for="(subItem, subIndex) in item.children"
        :key="subIndex"
        @click="clickMenu(subItem)"
        class="menuItem"
      >
        <span>{{ subItem.meta.title }}</span>
        <!-- 添加常用功能的收藏图标 -->
        <el-tooltip
          class="box-item"
          effect="light"
          :content="subItem.isFavorite ? '取消常用功能' : '设为常用功能'"
          placement="right"
        >
          <el-icon
            :class="{ star: true, 'star-visible': subItem.isFavorite }"
            @click.stop="toggleFavorite(subItem)"
          >
            <template v-if="subItem.isFavorite">
              <StarFilled />
              <!-- 填充的星星图标 -->
            </template>
            <template v-else>
              <Star />
              <!-- 空心星星图标 -->
            </template>
          </el-icon>
        </el-tooltip>
      </el-menu-item>
    </el-sub-menu>

    <!-- 三级菜单 -->
    <el-sub-menu :index="item.path" v-for="item in hasCC()" :key="item.path">
      <!-- 一级菜单 -->
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- 二级菜单的遍历 -->
      <template v-for="child in item.children">
        <!-- 有三级子菜单的情况 -->
        <el-sub-menu
          v-if="child.children"
          :index="child.path"
          :key="'sub-menu-' + child.path"
        >
          <template #title>
            <span>{{ child.meta.title }}</span>
          </template>

          <!-- 三级菜单的遍历 -->
          <el-menu-item
            v-for="grandChild in filterThirdLevelMenus(child)"
            :index="grandChild.path"
            :key="'menu-item-' + grandChild.path"
            @click="clickMenu(grandChild)"
            class="menuItem"
          >
            <span>{{ grandChild.meta.title }}</span>
            <el-tooltip
              class="box-item"
              effect="light"
              :content="item.isFavorite ? '取消常用功能' : '设为常用功能'"
              placement="right"
            >
              <el-icon
                :class="{ star: true, 'star-visible': grandChild.isFavorite }"
                @click.stop="toggleFavorite(grandChild)"
              >
                <template v-if="grandChild.isFavorite">
                  <StarFilled />
                  <!-- 填充的星星图标 -->
                </template>
                <template v-else>
                  <Star />
                  <!-- 空心星星图标 -->
                </template>
              </el-icon>
            </el-tooltip>
          </el-menu-item>
        </el-sub-menu>

        <!-- 没有三级子菜单的情况 -->
        <el-menu-item
          v-else
          :index="child.path"
          :key="'menu-item-alone-' + child.path"
          @click="clickMenu(child)"
          class="menuItem"
        >
          <span>{{ child.meta.title }}</span>
          <el-tooltip
          class="box-item"
          effect="light"
          :content="item.isFavorite ? '取消常用功能' : '设为常用功能'"
          placement="right"
        >
          <el-icon 
          :class="{'star': true, 'star-visible': child.isFavorite}"
          @click.stop="toggleFavorite(child)">
            <template v-if="child.isFavorite">
              <StarFilled />
              <!-- 填充的星星图标 -->
            </template>
            <template v-else>
              <Star />
              <!-- 空心星星图标 -->
            </template>
          </el-icon>
        </el-tooltip>
        </el-menu-item>
      </template>
    </el-sub-menu>
  </el-menu>
  <div class="bottom" v-show="!userMenu.isCollapse">
    <!-- <span @click="toggleMenu">用户：{{ userStore.name }}</span>
    <transition name="slide">
      <el-menu v-if="showMenu">
        <el-menu-item @click="changePassword">修改密码</el-menu-item>
        <el-menu-item @click="logout">退出登录</el-menu-item>
      </el-menu>
    </transition> -->

    <el-dropdown>
      <el-button type="primary">
        <!-- 用户：{{ userStore.name }} -->
        <span>用户:  {{userStore.name}}</span>
        <!-- <el-icon class="el-icon--right"><arrow-down /></el-icon> -->
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="changePassword">修改密码</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 修改密码弹窗表单 -->
    <el-dialog
      v-model="dialogVisible"
      title="修改密码"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="passwordForm" label-width="120px">
        <!-- 旧密码 -->
        <el-form-item label="旧密码">
          <!-- <el-input v-model="passwordForm.oldPassword" type="password"></el-input> -->
          <input v-model="passwordForm.oldPassword" type="password" />
        </el-form-item>

        <!-- 新密码 -->
        <el-form-item label="新密码">
          <input v-model="passwordForm.newPassword" type="password" />
        </el-form-item>

        <!-- 确认新密码 -->
        <el-form-item label="确认新密码">
          <input v-model="passwordForm.confirmPassword" type="password" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm" class="sumbit"
        >提交</el-button
      >
      <el-button type="primary" @click="cancelForm" class="cancel"
        >取消</el-button
      >
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, h, nextTick } from 'vue'

const isCollapse = ref(false)
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import useUserMenu from '@/store/modules/menu'
import useUserStore from '@/store/modules/user'
import '../utils/auth'
import Cookies from 'js-cookie'
import { removeToken } from '../utils/auth'
// 过滤带有 meta 字段的路由，并存储在数组中
let list = []
const userMenu = useUserMenu()
const userStore = useUserStore()
const showMenu = ref(false)
const dialogVisible = ref(false)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

function toggleFavorite(subItem) {
  if (!subItem.isFavorite) {
    userMenu.favorites.push({
      name: subItem.name,
      label: subItem.meta.title,
      path: subItem.path
    })
  } else {
    // 如果当前项已被收藏，从收藏列表中找到对应的对象并移除
    const index = userMenu.favorites.findIndex(favorite => favorite.name === subItem.name);
    if (index > -1) {
      userMenu.favorites.splice(index, 1);
    }
  }
  //切换收藏状态
  subItem.isFavorite = !subItem.isFavorite
  userMenu.updateFavorites(userMenu.favorites)
}

const handleClose = () => {
  passwordForm.value.oldPassword = ''
  passwordForm.value.newPassword = ''
  passwordForm.value.confirmPassword = ''
  dialogVisible.value = false
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

function changePassword() {
  dialogVisible.value = true

  // console.log("修改密码",dialogVisible.value);
  showMenu.value = false
}
function submitForm() {
  if (
    !passwordForm.value.oldPassword ||
    !passwordForm.value.newPassword ||
    !passwordForm.value.confirmPassword
  ) {
    ElMessage({
      message: '请检查输入内容是否完整',
      type: 'info'
    })
    return
  }
  userStore
    .updatePwd(
      passwordForm.value.oldPassword,
      passwordForm.value.newPassword,
      passwordForm.value.confirmPassword
    )
    .then((res) => {
      if (res.code === 200) {
        Cookies.remove('token')
        router.push({ path: '/login' })
        ElMessage({
          message: '密码修改成功,请重新登录',
          type: 'success'
        })
      } else {
        ElMessage.error(res.message)
      }
    })

  passwordForm.value.oldPassword = ''
  passwordForm.value.newPassword = ''
  passwordForm.value.confirmPassword = ''

  // console.log('提交修改密码成功submit!');
  dialogVisible.value = false
}
function cancelForm() {
  passwordForm.value.oldPassword = ''
  passwordForm.value.newPassword = ''
  passwordForm.value.confirmPassword = ''
  dialogVisible.value = false
}

function logout() {
  // 这里加入退出登录的代码
  userStore.token = ''
  userStore.roles = []
  userStore.routers = []
  localStorage.removeItem('name')
  // localStorage.removeItem('pageSize')
  sessionStorage.removeItem('tabs')
  removeToken()
  router.push({ path: '/login' })

  console.log('退出登录')
  showMenu.value = false
}
// console.log(userStore.name,'@@')

// list = router.getRoutes().filter(route => route.meta && route.meta.title)
list = useUserMenu().menu

// 一级菜单
const noChildren = () => {
  return list.filter(
    (item) =>
      (!item.children || item.children.length === 0) && item.hidden == false
  )
}
// 二级菜单
const hasChildren = () => {
  return list.filter(
    (item) =>
      item.children && item.threeChildren != true && item.hidden == false
  )
}
// 三级菜单
const hasCC = () => {
  return list.filter((item) => item.children && item.threeChildren == true)
}

// const CC = () => {
//     let thirdLevelMenus = [];
//     // 遍历一级菜单
//     list.forEach(item => {
//       // 检查是否存在二级菜单
//       if (item.children) {
//         // 遍历二级菜单
//         item.children.forEach(child => {
//             // 检查是否存在三级菜单
//           if (child.children) {
//             const filteredMenus = child.children.filter(cc => cc.hidden === false);
//                 thirdLevelMenus = thirdLevelMenus.concat(filteredMenus);
//             }
//         });
//       }
//     });
//     return thirdLevelMenus;
// };

const filterThirdLevelMenus = (child) => {
  if (child && child.children) {
    return child.children.filter((grandChild) => !grandChild.hidden)
  }
  return []
}

const clickMenu = (item) => {
  // console.log(item,'三级菜单的隐藏')
  router.push({
    path: item.path
  })
  // vuex 来管理
  userMenu.selectMenu(item)
}
</script>

<style>
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-menu {
  background-color: #f1f4f6;
}
</style>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  background-color: rgba(0, 0, 0, 0);
}
span {
  font-size: 12px;
}
h3 {
  text-align: center;
}
.el-menu {
  text-align: center;
  border: none;
}
.el-menu-vertical-demo {
  max-height: calc(
    100vh - 110px
  ); /* 50px is the height of the bottom section, you can adjust it accordingly */
  overflow-y: auto;
}

.el-menu-item:hover {
  background-color: #0053b5;
  color: #fff;
}
.menuItem {
  justify-content: space-between;
}
.menuItem .star {
  visibility: hidden;
}

.menuItem:hover .star,
.menuItem .star-visible {
  visibility: visible;
}
/* 被收藏时的星星样式 */
.star-visible {
  color: #ffd700; /* 或者您喜欢的颜色 */
}
.bottom > span {
  cursor: pointer;
  color: #0053b5;
}
.bottom {
  z-index: 1000;
  position: fixed;
  bottom: 0;
  width: 200px;
  text-align: center;
  margin-bottom: 10px;
  /* margin-top: 10px; */
}
input {
  height: 35px;
  width: 300px;
  /* background-color: red; */
  border: 1px solid #0053b5;
  box-sizing: border-box;
  border-radius: 5px;
  /* border: none; */
}
.sumbit {
  /* text-align: center; */
  margin: 0 auto;
}
.el-form-item,
.sumbit,
.cancel {
  margin-top: 15px;
}
</style>

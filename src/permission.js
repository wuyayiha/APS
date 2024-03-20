import router from '@/router' // 导入你的路由配置
import { getToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'
import useUserStore from '@/store/modules/user'
import { defineAsyncComponent } from 'vue'
import useUserMenu from './store/modules/menu'
import { startTimer } from './utils/timerControl'
import UseScheduling from '@/store/modules/scheduling'
import { connectToSSE } from '@/utils/sseService'
import { generateRoutes } from './utils/permission'
import { generateRoutesFromMenu } from './router/index'
// import useUserMenu from './store/modules/menu';

// const userMenu = useUserMenu()
function findMenuItem(menu, name) {
  for (let item of menu) {
    if (item.name === name) {
      return item
    }

    if (item.children) {
      const found = findMenuItem(item.children, name)
      if (found) {
        return found
      }
    }
  }
  return null
}

router.beforeEach((to, from, next) => {
  const token = getToken() // 从 Cookie 中获取令牌
  // const menu = [];
  const menuArray = []

  // 如果存在令牌，说明用户已登录，可以继续访问
  if (token) {
    // console.log(router,'to')
    // 路由变化时，自动添加顶部导航栏
    if (to.name && to.path != '/login' && to.path != '/default') {
      // useUserMenu().selectMenu(to);
      const matchedMenu = findMenuItem(useUserMenu().menu, to.name)
      // console.log(matchedMenu, 'matchedMenu');
      if (matchedMenu) {
        useUserMenu().selectMenu(matchedMenu)
      }
    }
    //  console.log(to,'123')
    // next(); // 继续路由导航
    if (useUserStore().roles.length === 0) {
      // 判断当前用户是否已拉取完user_info信息
      useUserStore()
        .getInfo()
        .then((res) => {
          // 根据roles权限生成可访问的路由表
          useUserMenu().menu.push(...res.data.routers)
          
          // 根据用户权限加载菜单
          // useUserMenu().setMenuVisibility(useUserMenu().menu,1)

          // 注册所有的路由
          generateRoutes()
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        })
        .catch((err) => {
          console.log('permission代码报错', err)
        })
    }
    else if (useUserMenu().favorites[0] == -1) {
      useUserMenu().getFavorites().then((res) => {
        if (res.code == 200) {
          next()
        }
      })
      
    }
    else {
      if (to.path == '/login') { 
        next('/default')
      } else if (to.path == '/schedule' && useUserStore().isSchedule == false) {
        useUserStore().isSchedule = true
        console.log('进入排程界面了，向后端发送请求')

        //获取锁
        UseScheduling()
          .getPageLock()
          .then((res) => {
            //获取锁成功的话开启定时器还有通过sse跟后端建立链接
            if (res.code == 200) {
              //跟后端建立链接
              connectToSSE()

              //开启定时器
              startTimer()
            } else {
              ElMessageBox.alert(res.message, '提示', {
                confirmButtonText: '好的'
              })
            }
          })
          .catch((error) => {})
        //后端返回成功加锁的信息之后，再开始定时向后端发送请求
        next()
      } else {
        next()
      }
    }
  } else {
    // 如果没有令牌，并且当前路由不是登录页，就跳转到登录页面
    if (to.path !== '/login') {
      next('/login') // 可以根据你的登录路由路径进行修改
    } else {
      next() // 如果当前路由已经是登录页，则继续路由导航
    }
  }
})

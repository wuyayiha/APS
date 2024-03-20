import { createWebHistory, createRouter } from 'vue-router'
import Login from '../views/Login'
import Index from '../views/Index'
import useUserMenu from '@/store/modules/menu'

// 公用路由
export const constantRoutes = [
  {
    name: 'root',
    path: '/',
    redirect: '/default', // 重定向到 '/index'
    hidden: true
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    name: 'home',
    path: '/index',
    component: Index,
    hidden: true
  }
]

// console.log(useUserMenu().menu,'menu')
// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/default',
    component: () => import('@/views/default'),
    name: 'default'
  },
  {
    path: '/gtt1',
    component: () => import('@/views/system/gtt/product'),
    name: 'gtt1'
  },
  {
    path: '/userManage',
    component: () => import('@/views/system/sysUser/list'),
    name: 'userManage'
  },
  {
    path: '/rolesManage',
    component: () => import('@/views/system/sysRole/list'),
    name: 'rolesManage'
  },
  {
    path: '/deptManage',
    component: () => import('@/views/permission/deptManage'),
    name: 'deptManage'
  },
  {
    path: '/viewRolesManage',
    component: () => import('@/views/permission/viewRolesManage'),
    name: 'viewRolesManage'
  },
  {
    path: '/viewInfoManage',
    component: () => import('@/views/permission/viewInfoManage'),
    name: 'viewInfoManage'
  },
  {
    path: '/schedule',
    component: () => import('@/views/schedule'),
    name: 'schedule'
  },
  {
    path: '/processName',
    component: () => import('@/views/metaData/processManage/processName'),
    name: 'processName'
  },
  {
    path: '/processCapacity',
    component: () => import('@/views/metaData/processManage/processCapacity'),
    name: 'processCapacity'
  },
  {
    path: '/createBasePlan',
    component: () => import('@/views/metaData/processManage/createBasePlan'),
    name: 'createBasePlan',
    meta: {
      title: '创建基础方案'
    }
  },
  {
    path: '/viewBasePlan',
    component: () => import('@/views/metaData/processManage/viewBasePlan'),
    name: 'viewBasePlan',
    meta: {
      title: '查看基础方案'
    }
  },
  {
    path: '/moveData',
    component: () => import('@/views/metaData/processManage/moveData'),
    name: 'moveData',
    meta: {
      title: '移动工序'
    }
  },
  {
    path: '/basePlan',
    component: () => import('@/views/metaData/processManage/basePlan'),
    name: 'basePlan'
  },
  {
    path: '/lastPlan',
    component: () => import('@/views/metaData/processManage/lastPlan'),
    name: 'lastPlan'
  },
  {
    path: '/productPlan',
    component: () => import('@/views/productionPlan/productPlan'),
    name: 'productPlan'
  },
  {
    path: '/semiFinishedProducts',
    component: () => import('@/views/productionPlan/semiFinishedProducts'),
    name: 'semiFinishedProducts'
  },
  {
    path: '/productPlanMaterialShort',
    component: () => import('@/views/productionPlan/productPlanMaterialShort'),
    name: 'productPlanMaterialShort'
  },
  {
    path: '/sFMaterialShort',
    component: () => import('@/views/productionPlan/sFMaterialShort'),
    name: 'sFMaterialShort'
  },
  {
    path: '/semiFinishedBasicData',
    component: () =>
      import('@/views/metaData/materialBasicData/semiFinishedBasicData'),
    name: 'semiFinishedBasicData'
  },
  {
    path: '/finishedProductBasicData',
    component: () =>
      import('@/views/metaData/materialBasicData/finishedProductBasicData'),
    name: 'finishedProductBasicData'
  },
  {
    path: '/rawMaterialBasicData',
    component: () =>
      import('@/views/metaData/materialBasicData/rawMaterialBasicData'),
    name: 'rawMaterialBasicData'
  },
  {
    path: '/attendanceManagement',
    component: () => import('@/views/metaData/workDate/attendanceManagement'),
    name: 'attendanceManagement'
  },
  {
    path: '/machineManagement',
    component: () => import('@/views/metaData/machineManagement'),
    name: 'machineManagement'
  },
  {
    path: '/immediateInventory',
    component: () => import('@/views/port/ERP/immediateInventory'),
    name: 'immediateInventory'
  },
  {
    path: '/productionMaterial',
    component: () => import('@/views/port/ERP/productionMaterial'),
    name: 'productionMaterial'
  },
  {
    path: '/productionOrder',
    component: () => import('@/views/port/ERP/productionOrder'),
    name: 'productionOrder'
  },
  {
    path: '/purchaseOrder',
    component: () => import('@/views/port/ERP/purchaseOrder'),
    name: 'purchaseOrder'
  },
  {
    path: '/receiveNotice',
    component: () => import('@/views/port/ERP/receiveNotice'),
    name: 'receiveNotice'
  },
  {
    path: '/inventoryLock',
    component: () => import('@/views/port/ERP/inventoryLock'),
    name: 'inventoryLock'
  },
  {
    path: '/materialBom',
    component: () => import('@/views/port/ERP/materialBom'),
    name: 'materialBom'
  },
  {
    path: '/outboundApplication',
    component: () => import('@/views/port/ERP/outboundApplication'),
    name: 'outboundApplication'
  },
  {
    path: '/mesUnfinished',
    component: () => import('@/views/port/MES/mesUnfinished'),
    name: 'mesUnfinished'
  },
  {
    path: '/dailyDataUpload',
    component: () => import('@/views/port/MES/dailyDataUpload'),
    name: 'dailyDataUpload'
  },
  {
    path: '/fimRequest',
    component: () => import('@/views/port/FIM/fimRequest'),
    name: 'fimRequest'
  },
  {
    path: '/fimPriority',
    component: () => import('@/views/port/FIM/fimPriority'),
    name: 'fimPriority'
  },
  {
    path: '/finishedInventory',
    component: () => import('@/views/inventoryManagement/finishedInventory'),
    name: 'finishedInventory'
  },
  {
    path: '/semifinishedInventory',
    component: () =>
      import('@/views/inventoryManagement/semifinishedInventory'),
    name: 'semifinishedInventory'
  },
  {
    path: '/rawMaterialInventory',
    component: () => import('@/views/inventoryManagement/rawMaterialInventory'),
    name: 'rawMaterialInventory'
  }
]

export function generateRoutesFromMenu(menu) {
  let routes = []
  const modules = import.meta.glob('@/views/**/*.vue')
  console.log(modules, 'modules')

  // 递归遍历菜单以生成路由
  function buildRoutes(menuItems) {
    for (const item of menuItems) {
      // let url = '../views' + item.component
      /* if (item.component) { */
      const route = {
        path: item.path,
        name: item.name,
        // component: '../views'+item.component,
        // component:()=>import(url),
        component: modules[`/src/views${item.component}.vue`],
        meta: item.meta,
        // 如果存在子菜单项，递归构建它们的路由
        children: item.children ? buildRoutes(item.children) : []
      }

      // 将构建的路由添加到路由数组中
      routes.push(route)
      // }

      // console.log(item.component,'component')
    }
  }

  // 从顶层菜单开始构建路由
  buildRoutes(menu)
  console.log(routes, 'routes')

  routes.forEach((item) => {
    router.addRoute('home', item)
  })
  return routes
}

const router = createRouter({
  // 消除单页面应用中路由的#
  history: createWebHistory(),
  routes: constantRoutes,
  //这段代码控制了路由切换时页面滚动的行为，使得在通过前进或后退按钮切换路由时，
  //可以恢复到之前滚动的位置，而在其他情况下，页面都会滚动到顶部。
  //这通常用于提供更好的用户体验，以确保在页面切换时用户不会丢失滚动的位置信息。
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router

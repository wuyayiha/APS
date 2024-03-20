import { defineStore } from 'pinia'
import _ from 'lodash'
import { scrollToTag } from '../../utils/scroll'
import { getFavorites, updateFavorites } from '@/api/default'

const useUserMenu = defineStore('menu', {
  state: () => ({
    menu: [
      {
        name: 'default',
        path: '/default',
        hidden: true,
        component: '/default',
        isFavorite: false,
        meta: {
          title: '默认界面'
        }
      },
      {
        name: 'schedule',
        path: '/schedule',
        hidden: false,
        component: '/schedule',
        alwaysShow: 'true',
        isFavorite: false,
        meta: {
          title: '排程'
        }
      },
      {
        name: 'test4',
        path: '/test4',
        hidden: false,
        // component: "four",
        meta: {
          title: '甘特图'
        },
        children: [
          {
            name: 'gtt1',
            path: '/gtt1',
            component: '/system/gtt/product',
            alwaysShow: 'true',
            meta: {
              title: '产品甘特图'
            }
          }
        ]
      },
      {
        name: 'permission',
        path: '/test1',
        hidden: true,
        meta: {
          title: '用户及权限管理'
        },
        children: [
          {
            name: 'userManage',
            path: '/userManage',
            component: '/system/sysUser/list',
            isFavorite: false,
            meta: {
              title: '用户管理'
            }
          },
          {
            name: 'rolesManage',
            path: '/rolesManage',
            component: '/system/sysRole/list',
            isFavorite: false,
            meta: {
              title: '角色管理'
            }
          },
          {
            name: 'deptManage',
            path: '/deptManage',
            component: '/permission/deptManage',
            isFavorite: false,
            meta: {
              title: '部门管理'
            }
          },
          {
            name: 'viewRolesManage',
            path: '/viewRolesManage',
            component: '/permission/viewRolesManage',
            isFavorite: false,
            meta: {
              title: '视图列角色管理'
            }
          },
          {
            name: 'viewInfoManage',
            path: '/viewInfoManage',
            component: '/permission/viewInfoManage',
            isFavorite: false,
            meta: {
              title: '视图列信息管理'
            }
          }
        ]
      },
      // {
      //   name: 'testGtt',
      //   path: '/testGtt',
      //   hidden: false,
      //   component: '/test',
      //   alwaysShow: 'true',
      //   meta: {
      //     title: '测试甘特图'
      //   }
      // },
      {
        name: 'productionPlan',
        path: '/productionPlan',
        hidden: false,
        meta: {
          title: '生产计划'
        },
        children: [
          {
            name: 'productPlan',
            path: '/productPlan',
            component: '/productionPlan/productPlan',
            alwaysShow: 'true',
            meta: {
              title: '成品生产计划'
            }
          },
          {
            name: 'semiFinishedProducts',
            path: '/semiFinishedProducts',
            component: '/productionPlan/semiFinishedProducts',
            alwaysShow: 'true',
            meta: {
              title: '半成品生产计划'
            }
          },
          {
            name: 'productPlanMaterialShort',
            path: '/productPlanMaterialShort',
            component: '/productionPlan/productPlanMaterialShort',
            alwaysShow: 'true',
            meta: {
              title: '成品缺料分析'
            }
          },
          {
            name: 'sFMaterialShort',
            path: '/sFMaterialShort',
            component: '/productionPlan/sFMaterialShort',
            alwaysShow: 'true',
            meta: {
              title: '半成品缺料分析'
            }
          }
        ]
      },
      {
        name: 'port',
        path: '/port',
        hidden: false,
        threeChildren: true,
        // component: "four",
        meta: {
          title: '接口数据'
        },
        children: [
          {
            name: 'ERP',
            path: '/ERP',
            meta: {
              title: 'ERP'
            },
            children: [
              {
                name: 'immediateInventory',
                path: '/immediateInventory',
                component: '/port/ERP/immediateInventory',
                alwaysShow: 'true',
                meta: {
                  title: '即时库存'
                }
              },
              {
                name: 'productionMaterial',
                path: '/productionMaterial',
                component: '/port/ERP/productionMaterial',
                alwaysShow: 'true',
                meta: {
                  title: '用料清单列表'
                }
              },
              {
                name: 'productionOrder',
                path: '/productionOrder',
                component: '/port/ERP/productionOrder',
                alwaysShow: 'true',
                meta: {
                  title: '委外/生产订单列表'
                }
              },
              {
                name: 'purchaseOrder',
                path: '/purchaseOrder',
                component: '/port/ERP/purchaseOrder',
                alwaysShow: 'true',
                meta: {
                  title: '采购列表'
                }
              },
              {
                name: 'receiveNotice',
                path: '/receiveNotice',
                component: '/port/ERP/receiveNotice',
                alwaysShow: 'true',
                meta: {
                  title: '收料通知单列表'
                }
              },
              {
                name: 'inventoryLock',
                path: '/inventoryLock',
                component: '/port/ERP/inventoryLock',
                alwaysShow: 'true',
                meta: {
                  title: '库存锁库列表'
                }
              },
              {
                name: 'materialBom',
                path: '/materialBom',
                component: '/port/ERP/materialBom',
                alwaysShow: 'true',
                meta: {
                  title: '物料清单列表'
                }
              },
              {
                name: 'outboundApplication',
                path: '/outboundApplication',
                component: '/port/ERP/outboundApplication',
                alwaysShow: 'true',
                meta: {
                  title: '出库申请单'
                }
              }
            ]
          },
          {
            name: 'MES',
            path: '/MES',
            meta: {
              title: 'MES'
            },
            children: [
              {
                name: 'mesUnfinished',
                path: '/mesUnfinished',
                component: '/port/MES/mesUnfinished',
                alwaysShow: 'true',
                meta: {
                  title: 'MES 未完工'
                }
              },
              {
                name: 'dailyDataUpload',
                path: '/dailyDataUpload',
                component: '/port/MES/dailyDataUpload',
                alwaysShow: 'true',
                meta: {
                  title: '日别数据'
                }
              }
            ]
          },
          {
            name: 'FIM',
            path: '/FIM',
            meta: {
              title: 'FIM'
            },
            children: [
              {
                name: 'fimRequest',
                path: '/fimRequest',
                component: '/port/FIM/fimRequest',
                alwaysShow: 'true',
                meta: {
                  title: 'FIM需求'
                }
              },
              {
                name: 'fimPriority',
                path: '/fimPriority',
                component: '/port/FIM/fimPriority',
                alwaysShow: 'true',
                meta: {
                  title: 'FIM优先级'
                }
              }
            ]
          }
        ]
      },
      {
        name: 'metaData',
        path: '/metaData',
        hidden: false,
        threeChildren: true,
        meta: {
          title: '主数据管理'
        },
        children: [
          {
            name: 'processManage',
            path: '/processManage',
            meta: {
              title: '工序与产能管理'
            },
            children: [
              {
                name: 'processName',
                path: '/processName',
                hidden: false,
                component: '/metaData/processManage/processName',
                meta: {
                  title: '工序命名池'
                }
              },
              {
                name: 'processCapacity',
                path: '/processCapacity',
                hidden: false,
                component: '/metaData/processManage/processCapacity',
                meta: {
                  title: '工序与产能'
                }
              },
              {
                name: 'createBasePlan',
                path: '/createBasePlan',
                hidden: true,
                component: '/metaData/processManage/createBasePlan',
                meta: {
                  title: '创建基础方案'
                }
              },
              {
                name: 'viewBasePlan',
                path: '/viewBasePlan',
                hidden: true,
                component: '/metaData/processManage/viewBasePlan',
                meta: {
                  title: '查看基础方案'
                }
              },
              {
                name: 'moveData',
                path: '/moveData',
                hidden: true,
                component: '/metaData/processManage/moveData',
                meta: {
                  title: '移动工序'
                }
              },
              {
                name: 'basePlan',
                path: '/basePlan',
                hidden: false,
                component: '/metaData/processManage/basePlan',
                meta: {
                  title: '基础工艺方案列表'
                }
              },
              {
                name: 'lastPlan',
                path: '/lastPlan',
                hidden: false,
                component: '/metaData/processManage/lastPlan',
                meta: {
                  title: '最终工艺方案'
                }
              }
            ]
          },
          {
            name: 'materialBasicData',
            path: '/materialBasicData',
            meta: {
              title: '物料基础数据'
            },
            children: [
              {
                name: 'semiFinishedBasicData',
                path: '/semiFinishedBasicData',
                hidden: false,
                component: '/metaData/materialBasicData/semiFinishedBasicData',
                meta: {
                  title: '半成品基础数据'
                }
              },
              {
                name: 'finishedProductBasicData',
                path: '/finishedProductBasicData',
                hidden: false,
                component:
                  '/metaData/materialBasicData/finishedProductBasicData',
                meta: {
                  title: '成品基础数据'
                }
              },
              {
                name: 'rawMaterialBasicData',
                path: '/rawMaterialBasicData',
                hidden: false,
                component: '/metaData/materialBasicData/rawMaterialBasicData',
                meta: {
                  title: '原材料基础数据'
                }
              }
            ]
          },
          {
            name: 'attendanceManagement',
            path: '/attendanceManagement',
            hidden: false,
            component: '/metaData/workDate/attendanceManagement',
            meta: {
              title: '出勤管理'
            }
          },
          {
            name: 'machineManagement',
            path: '/machineManagement',
            component: '/metaData/machineManagement',
            meta: {
              title: '机器管理'
            }
          }
        ]
      },
      {
        name: 'inventoryManagement',
        path: '/inventoryManagement',
        hidden: true,
        meta: {
          title: '库存管理'
        },
        children: [
          {
            name: 'finishedInventory',
            path: '/finishedInventory',
            hidden: false,
            component: '/inventoryManagement/finishedInventory',
            meta: {
              title: '日别成品库存'
            }
          },
          {
            name: 'semifinishedInventory',
            path: '/semifinishedInventory',
            hidden: false,
            component: '/inventoryManagement/semifinishedInventory',
            meta: {
              title: '日别半成品库存'
            }
          },
          {
            name: 'rawMaterialInventory',
            path: '/rawMaterialInventory',
            hidden: false,
            component: '/inventoryManagement/rawMaterialInventory',
            meta: {
              title: '日别原材料库存'
            }
          }
        ]
      }
    ],
    // 根据用户类型存储不可访问的菜单，菜单权限
    userTypeInaccessible: {
      1: ['test4', 'permission', 'testGtt'] // 示例：用户类型 1 不可访问的菜单项
    },
    // 按钮权限
    accessMapping: {
      1: ['view'], // 访客用户只能查看
      2: ['view', 'edit', 'delete', 'add'] // 假设用户类型2是管理员，拥有所有权限
    },
    favorites: [-1], //收藏的菜单
    isCollapse: false,
    currentMenu: null,
    tabsList: JSON.parse(sessionStorage.getItem('tabs')) || []
  }),
  actions: {
    selectMenu(val) {
      // 判断
      if (val.name == 'home') {
        this.currentMenu = null
      } else {
        this.currentMenu = val
        let result = this.tabsList.findIndex((item) => item.name === val.name)

        result == -1 ? this.tabsList.push(_.cloneDeep(val)) : ''
        sessionStorage.setItem('tabs', JSON.stringify(this.tabsList))
        scrollToTag(val.name)
      }
    },
    closeTab(val) {
      let res = this.tabsList.findIndex((item) => item.name === val.name)
      this.tabsList.splice(res, 1)
      sessionStorage.setItem('tabs', JSON.stringify(this.tabsList))
    },
    // 菜单权限
    setMenuVisibility(menu, userType) {
      const inaccessibleMenus = this.userTypeInaccessible[userType] || []

      menu.forEach((item) => {
        // 如果菜单项在不可访问列表中，设置 hidden 为 true
        if (inaccessibleMenus.includes(item.name)) {
          item.hidden = true
        }

        // 如果有子菜单，递归处理
        if (item.children && item.children.length > 0) {
          this.setMenuVisibility(item.children, userType)
        }
      })
    },
    // 按钮权限
    hasAccessToButton(userType, button) {
      const accessibleButtons = this.accessMapping[userType] || []
      return accessibleButtons.includes(button)
    },
    // 常用功能
    // findFavorites(menu) {
    //   const favorites = []
    //   function recurseThroughMenu(items) {
    //     items.forEach((item) => {
    //       if (item.isFavorite) {
    //         favorites.push(item.name)
    //       }
    //       if (item.children && item.children.length) {
    //         recurseThroughMenu(item.children)
    //       }
    //     })
    //   }

    //   recurseThroughMenu(menu)
    //   return favorites
    // },
    // 获取到常用功能后将menu中的Favorite设置为true
    setFavorites(favorites, menu) {
      // 遍历并重置每个菜单项的收藏状态
      function resetFavorites(items) {
        items.forEach((item) => {
          item.isFavorite = false // 重置为非收藏状态
          if (item.children && item.children.length) {
            resetFavorites(item.children) // 递归重置子菜单项
          }
        })
      }

      // 重置菜单中所有项的收藏状态
      resetFavorites(menu)

      // 遍历整个菜单，包括嵌套的子菜单
      function traverseMenu(items) {
        items.forEach((item) => {
          // 查找并设置收藏状态
          const favoriteItem = favorites.find((f) => f.name === item.name)
          if (favoriteItem) {
            item.isFavorite = true
          }
          // 如果有子菜单，递归遍历子菜单
          if (item.children && item.children.length) {
            traverseMenu(item.children)
          }
        })
      }

      // 开始遍历菜单
      traverseMenu(menu)
    },
    // 获取常用功能
    getFavorites() {
      return new Promise((resolve, reject) => {
        getFavorites()
          .then((res) => {
            if (res.code == 200) {
              this.setFavorites(res.data, this.menu)
              this.favorites = res.data
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 更新常用功能
    updateFavorites(param) {
      return new Promise((resolve, reject) => {
        updateFavorites(param)
          .then((res) => {
            if (res.code == 200) {
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})
export default useUserMenu

import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAllPage,
  add,
  update,
  deleteData,
  downloadInterfaceDate,
  importInterfaceData,
  downloadInterfaceTemplate,
  getPageFiltrate
} from '@/api/port/ERP/immediateInventory'
import { getCols, getViews } from '@/api/commonPlan'

function getFileName(type) {
  let fileName = ''
  if (type == 1) {
    fileName = '即时库存'
  } else if (type == 2) {
    fileName = '用料清单列表'
  } else if (type == 4) {
    fileName = '委外/生产订单列表'
  } else if (type == 6) {
    fileName = '采购列表'
  } else if (type == 8) {
    fileName = '收料通知单列表'
  } else if (type == 9) {
    fileName = '锁库存列表'
  } else if (type == 10) {
    fileName = '物料清单列表'
  } else if (type == 11) {
    fileName = '出库申请单'
  } else if (type == 33) {
    fileName = 'Mes未完工'
  }
  return fileName
}

const immediateInventory = defineStore('immediateInventory', {
  state: () => ({
    immediateInventory: {
      data: [],
      pages: 1,
      total: 0,
      // 所有列名
      column: [],
      // 所有视图
      views: [],
      // 视图的列名（包含了筛选条件）
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    productionMaterial: {
      data: [],
      total: 0,
      pages: 1,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    productionOrder: {
      data: [],
      total: 0,
      pages: 1,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    purchaseOrder: {
      data: [],
      total: 0,
      pages: 1,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    receiveNotice: {
      data: [],
      total: 0,
      pages: 1,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    inventoryLock: {
      data: [],
      total: 0,
      pages: 1,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },

    materialBom: {
      data: [],
      total: 0,
      pages: 1,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    outboundApplication: {
      data: [],
      total: 0,
      pages: 1,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },

    // MES未完工
    mesUnfinished: {
      data: [],
      total: 0,
      pages: 1,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
  }),
  actions: {
    getAllPage(page, size, type) {
      return new Promise((resolve, reject) => {
        getAllPage(page, size, type)
          .then((res) => {
            if (res.code == 200) {
              if (type == 1) {
                this.immediateInventory.data = res.data.list
                this.immediateInventory.pages = res.data.pages
                this.immediateInventory.total = res.data.total
              } else if (type == 2) {
                this.outsourcedMaterial.data = res.data.list
                this.outsourcedMaterial.pages = res.data.pages
                this.outsourcedMaterial.total = res.data.total
              } else if (type == 3) {
                this.productionMaterial.data = res.data.list
                this.productionMaterial.pages = res.data.pages
                this.productionMaterial.total = res.data.total
              } else if (type == 4) {
                this.outsourcedOrder.data = res.data.list
                this.outsourcedOrder.pages = res.data.pages
                this.outsourcedOrder.total = res.data.total
              } else if (type == 5) {
                this.productionOrder.data = res.data.list
                this.productionOrder.pages = res.data.pages
                this.productionOrder.total = res.data.total
              } else if (type == 6) {
                this.purchaseRequest.data = res.data.list
                this.purchaseRequest.pages = res.data.pages
                this.purchaseRequest.total = res.data.total
              } else if (type == 7) {
                this.purchaseOrder.data = res.data.list
                this.purchaseOrder.pages = res.data.pages
                this.purchaseOrder.total = res.data.total
              } else if (type == 8) {
                this.receiveNotice.data = res.data.list
                this.receiveNotice.pages = res.data.pages
                this.receiveNotice.total = res.data.total
              } else if (type == 9) {
                this.inventoryLock.data = res.data.list
                this.inventoryLock.pages = res.data.pages
                this.inventoryLock.total = res.data.total
              } else if (type == 10) {
                this.materialBom.data = res.data.list
                this.materialBom.pages = res.data.pages
                this.materialBom.total = res.data.total
              } else if (type == 11) {
                this.outboundApplication.data = res.data.list
                this.outboundApplication.pages = res.data.pages
                this.outboundApplication.total = res.data.total
              }

              // MES
              else if (type == 20) {
                this.pcbaBurn.data = res.data.list
                this.pcbaBurn.pages = res.data.pages
                this.pcbaBurn.total = res.data.total
              } else if (type == 21) {
                this.tfminsPcbaBurn.data = res.data.list
                this.tfminsPcbaBurn.pages = res.data.pages
                this.tfminsPcbaBurn.total = res.data.total
              } else if (type == 22) {
                this.pcbaVersion.data = res.data.list
                this.pcbaVersion.pages = res.data.pages
                this.pcbaVersion.total = res.data.total
              } else if (type == 23) {
                this.tfminisPcbaVersion.data = res.data.list
                this.tfminisPcbaVersion.pages = res.data.pages
                this.tfminisPcbaVersion.total = res.data.total
              } else if (type == 24) {
                this.installationBoard.data = res.data.list
                this.installationBoard.pages = res.data.pages
                this.installationBoard.total = res.data.total
              } else if (type == 25) {
                this.tfminisInstallationBoard.data = res.data.list
                this.tfminisInstallationBoard.pages = res.data.pages
                this.tfminisInstallationBoard.total = res.data.total
              } else if (type == 26) {
                this.snLabeling.data = res.data.list
                this.snLabeling.pages = res.data.pages
                this.snLabeling.total = res.data.total
              } else if (type == 27) {
                this.tfminisSnLabeling.data = res.data.list
                this.tfminisSnLabeling.pages = res.data.pages
                this.tfminisSnLabeling.total = res.data.total
              } else if (type == 28) {
                this.calibrationTests.data = res.data.list
                this.calibrationTests.pages = res.data.pages
                this.calibrationTests.total = res.data.total
              } else if (type == 29) {
                this.tfminisCalibrationTests.data = res.data.list
                this.tfminisCalibrationTests.pages = res.data.pages
                this.tfminisCalibrationTests.total = res.data.total
              } else if (type == 30) {
                this.packagingTest.data = res.data.list
                this.packagingTest.pages = res.data.pages
                this.packagingTest.total = res.data.total
              } else if (type == 31) {
                this.tfminisPackagingTest.data = res.data.list
                this.tfminisPackagingTest.pages = res.data.pages
                this.tfminisPackagingTest.total = res.data.total
              } else if (type == 32) {
                this.tfminisMainBoardFixation.data = res.data.list
                this.tfminisMainBoardFixation.pages = res.data.pages
                this.tfminisMainBoardFixation.total = res.data.total
              }
            }

            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    add(param, type) {
      return new Promise((resolve, reject) => {
        add(param, type)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    update(param, type) {
      return new Promise((resolve, reject) => {
        update(param, type)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deleteData(param, type) {
      return new Promise((resolve, reject) => {
        deleteData(param, type)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 导出
    downloadInterfaceDate(param) {
      return new Promise((resolve, reject) => {
        const fileName = getFileName(param.tableId)
        downloadInterfaceDate(param, fileName)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    resetState() {
      // 重置状态逻辑
      this.$reset()
    },
    // 导入
    importInterfaceData(param, code) {
      return new Promise((resolve, reject) => {
        importInterfaceData(param, code)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 导入模板
    downloadInterfaceTemplate(type, param) {
      const fileName = getFileName(type) + '导入模板'
      return new Promise((resolve, reject) => {
        downloadInterfaceTemplate(type, param, fileName)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    getCols(tableId) {
      return new Promise((resolve, reject) => {
        getCols(tableId)
          .then((res) => {
            if (res.code == 200) {
              if (tableId == 1) {
                this.immediateInventory.column = res.data
              } else if (tableId == 2) {
                this.productionMaterial.column = res.data
              } else if (tableId == 4) {
                this.productionOrder.column = res.data
              } else if (tableId == 6) {
                this.purchaseOrder.column = res.data
              } else if (tableId == 8) {
                this.receiveNotice.column = res.data
              } else if (tableId == 9) {
                this.inventoryLock.column = res.data
              } else if (tableId == 10) {
                this.materialBom.column = res.data
              } else if (tableId == 11) {
                this.outboundApplication.column = res.data
              }
              else if (tableId == 33) {
                this.mesUnfinished.column = res.data
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getViews(tableId) {
      return new Promise((resolve, reject) => {
        getViews(tableId)
          .then((res) => {
            if (res.code == 200) {
              if (tableId == 1) {
                this.immediateInventory.views = res.data.viewTableVos
                this.immediateInventory.defaultViewId = res.data.defaultViewId
                this.immediateInventory.defaultViewName =
                  res.data.defaultViewName
              } else if (tableId == 2) {
                this.productionMaterial.views = res.data.viewTableVos
                this.productionMaterial.defaultViewId = res.data.defaultViewId
                this.productionMaterial.defaultViewName =
                  res.data.defaultViewName
              } else if (tableId == 4) {
                this.productionOrder.views = res.data.viewTableVos
                this.productionOrder.defaultViewId = res.data.defaultViewId
                this.productionOrder.defaultViewName = res.data.defaultViewName
              } else if (tableId == 6) {
                this.purchaseOrder.views = res.data.viewTableVos
                this.purchaseOrder.defaultViewId = res.data.defaultViewId
                this.purchaseOrder.defaultViewName = res.data.defaultViewName
              } else if (tableId == 8) {
                this.receiveNotice.views = res.data.viewTableVos
                this.receiveNotice.defaultViewId = res.data.defaultViewId
                this.receiveNotice.defaultViewName = res.data.defaultViewName
              } else if (tableId == 9) {
                this.inventoryLock.views = res.data.viewTableVos
                this.inventoryLock.defaultViewId = res.data.defaultViewId
                this.inventoryLock.defaultViewName = res.data.defaultViewName
              } else if (tableId == 10) {
                this.materialBom.views = res.data.viewTableVos
                this.materialBom.defaultViewId = res.data.defaultViewId
                this.materialBom.defaultViewName = res.data.defaultViewName
              } else if (tableId == 11) {
                this.outboundApplication.views = res.data.viewTableVos
                this.outboundApplication.defaultViewId = res.data.defaultViewId
                this.outboundApplication.defaultViewName = res.data.defaultViewName
              }
              else if (tableId == 33) {
                this.mesUnfinished.views = res.data.viewTableVos
                this.mesUnfinished.defaultViewId = res.data.defaultViewId
                this.mesUnfinished.defaultViewName = res.data.defaultViewName
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取当前表格数据
    getPageFiltrate(param, page, size) {
      return new Promise((resolve, reject) => {
        getPageFiltrate(param, page, size)
          .then((res) => {
            if (res.code == 200) {
              if (param.tableId == 1) {
                this.immediateInventory.data = res.data.list
                this.immediateInventory.pages = res.data.pages
                this.immediateInventory.total = res.data.total
                if (!param.cols) {
                  this.immediateInventory.viewColumn = res.data.columnTables
                }
              } else if (param.tableId == 2) {
                this.productionMaterial.data = res.data.list
                this.productionMaterial.pages = res.data.pages
                this.productionMaterial.total = res.data.total
                if (!param.cols) {
                  this.productionMaterial.viewColumn = res.data.columnTables
                }
              } else if (param.tableId == 4) {
                this.productionOrder.data = res.data.list
                this.productionOrder.pages = res.data.pages
                this.productionOrder.total = res.data.total
                if (!param.cols) {
                  this.productionOrder.viewColumn = res.data.columnTables
                }
              } else if (param.tableId == 6) {
                this.purchaseOrder.data = res.data.list
                this.purchaseOrder.pages = res.data.pages
                this.purchaseOrder.total = res.data.total
                if (!param.cols) {
                  this.purchaseOrder.viewColumn = res.data.columnTables
                }
              } else if (param.tableId == 8) {
                this.receiveNotice.data = res.data.list
                this.receiveNotice.pages = res.data.pages
                this.receiveNotice.total = res.data.total
                if (!param.cols) {
                  this.receiveNotice.viewColumn = res.data.columnTables
                }
              } else if (param.tableId == 9) {
                this.inventoryLock.data = res.data.list
                this.inventoryLock.pages = res.data.pages
                this.inventoryLock.total = res.data.total
                if (!param.cols) {
                  this.inventoryLock.viewColumn = res.data.columnTables
                }
              } else if (param.tableId == 10) {
                this.materialBom.data = res.data.list
                this.materialBom.pages = res.data.pages
                this.materialBom.total = res.data.total
                if (!param.cols) {
                  this.materialBom.viewColumn = res.data.columnTables
                }
              }
              else if (param.tableId == 11) {
                this.outboundApplication.data = res.data.list
                this.outboundApplication.pages = res.data.pages
                this.outboundApplication.total = res.data.total
                if (!param.cols) {
                  this.outboundApplication.viewColumn = res.data.columnTables
                }
              }
              else if (param.tableId == 33) {
                this.mesUnfinished.data = res.data.list
                this.mesUnfinished.pages = res.data.pages
                this.mesUnfinished.total = res.data.total
                if (!param.cols) {
                  this.mesUnfinished.viewColumn = res.data.columnTables
                }
              }
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

export default immediateInventory

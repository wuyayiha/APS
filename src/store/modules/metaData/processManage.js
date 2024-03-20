import { defineStore } from 'pinia'
import {
  updateProcessName,
  getProcessNamePools,
  deleteProcessName,
  getAllPackagingMethod,
  getAllProductFamily,
  addOrUpdateProcessCapacity,
  deleteProcessCapacity,
  getProcessCapacity,
  getProcessCapacityByProductFamily,
  saveProcessScheme,
  getProcessSchemeById,
  updateProcessScheme,
  getProcessScheme,
  deleteProcessScheme,
  getProcessSchemeManagement,
  updateProcessSchemeManagement,
  getProcessNamePoolsPages,
  updateProcessNumber,
  downloadProceeName,
  uploadNameFile,
  importProcessCapacity,
  downloadProcessCapacity,
  proceeNameTemplate,
  processCapacityTemplate
} from '@/api/metaData/processManage'
import { getMetaData, downloadMetaData } from '@/api/metaData/metaDataFilter'
import { getCols, getViews } from '@/api/commonPlan'


const processManage = defineStore('processManage', {
  state: () => ({
    processNames: {
      pages: 1,
      data: [],
      total: 0,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    capacity: {
      totalPages: 1,
      data: [],
      total: 0,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    packages: [],
    productFamily: [],
    totalPages: 2,
    createBasePlan: {
      number: '',
      productFamily: '',
      Edited: false,
      data: []
    },
    viewBasePlan: {
      number: 3,
      productFamily: '',
      data: []
    },
    basePlanList: {
      totalPages: 1,
      data: [],
      total: 0,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    lastPlanList: {
      totalPages: 1,
      data: [],
      total: 0,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    moveData: []
  }),
  actions: {
    getCols(tableId) {
      return new Promise((resolve, reject) => {
        getCols(tableId)
          .then((res) => {
            if (res.code == 200) {
              if (tableId == 60) {
                this.processNames.column = res.data
              } else if (tableId == 61) {
                this.capacity.column = res.data
              } else if (tableId == 62) {
                this.basePlanList.column = res.data
              } else if (tableId == 63) {
                this.lastPlanList.column = res.data
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
              if (tableId == 60) {
                this.processNames.views = res.data.viewTableVos
                this.processNames.defaultViewId = res.data.defaultViewId
                this.processNames.defaultViewName = res.data.defaultViewName
              } else if (tableId == 61) {
                this.capacity.views = res.data.viewTableVos
                this.capacity.defaultViewId = res.data.defaultViewId
                this.capacity.defaultViewName = res.data.defaultViewName
              } else if (tableId == 62) {
                this.basePlanList.views = res.data.viewTableVos
                this.basePlanList.defaultViewId = res.data.defaultViewId
                this.basePlanList.defaultViewName = res.data.defaultViewName
              } else if (tableId == 63) {
                this.lastPlanList.views = res.data.viewTableVos
                this.lastPlanList.defaultViewId = res.data.defaultViewId
                this.lastPlanList.defaultViewName = res.data.defaultViewName
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getMetaData(param, pages, size) {
      return new Promise((resolve, reject) => {
        getMetaData(param, pages, size)
          .then((res) => {
            if (res.code == 200) {
              if (param.tableId == 60) {
                this.processNames.data = res.data.list
                this.processNames.pages = res.data.pages
                this.processNames.total = res.data.total
                if (!param.cols) {
                  this.processNames.viewColumn = res.data.columnTables
                }
              } else if (param.tableId == 61) {
                this.capacity.data = res.data.list
                this.capacity.pages = res.data.pages
                this.capacity.total = res.data.total
                if (!param.cols) {
                  this.capacity.viewColumn = res.data.columnTables
                }
              } else if (param.tableId == 62) {
                this.basePlanList.data = res.data.list
                this.basePlanList.pages = res.data.pages
                this.basePlanList.total = res.data.total
                if (!param.cols) {
                  this.basePlanList.viewColumn = res.data.columnTables
                }
              } else if (param.tableId == 63) {
                this.lastPlanList.data = res.data.list
                this.lastPlanList.pages = res.data.pages
                this.lastPlanList.total = res.data.total
                if (!param.cols) {
                  this.lastPlanList.viewColumn = res.data.columnTables
                }
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadMetaData(param) {
      let fileName = ''
      if (param.tableId == 60) {
        fileName = '工序命名池'
      } else if (param.tableId == 61) {
        fileName = '工序与产能'
      } else if (param.tableId == 62) {
        fileName = '基础工艺方案'
      } else if (param.tableId == 63) {
        fileName = '最终工艺方案'
      }
      return new Promise((resolve, reject) => {
        downloadMetaData(param, fileName)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 老的接口
    //工序命名池
    updateProcessName(params) {
      return new Promise((resolve, reject) => {
        updateProcessName(params)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getProcessNamePools() {
      return new Promise((resolve, reject) => {
        getProcessNamePools()
          .then((res) => {
            if (res.code == 200) {
              this.processNames.data = res.data
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getProcessNamePoolsPages(pages, size) {
      return new Promise((resolve, reject) => {
        getProcessNamePoolsPages(pages, size)
          .then((res) => {
            if (res.code == 200) {
              this.processNames.data = res.data.apsProcessNamePools
              this.processNames.pages = res.data.pages
              this.processNames.total = res.data.total
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deleteProcessName(params) {
      return new Promise((resolve, reject) => {
        deleteProcessName(params)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadProceeName(param) {
      return new Promise((resolve, reject) => {
        downloadProceeName(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    uploadNameFile(param) {
      return new Promise((resolve, reject) => {
        uploadNameFile(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    proceeNameTemplate(param) {
      return new Promise((resolve, reject) => {
        proceeNameTemplate(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 工序与产能
    getAllPackagingMethod() {
      return new Promise((resolve, reject) => {
        getAllPackagingMethod()
          .then((res) => {
            if (res.code == 200) {
              this.packages = res.data
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getAllProductFamily() {
      return new Promise((resolve, reject) => {
        getAllProductFamily()
          .then((res) => {
            if (res.code == 200) {
              this.productFamily = res.data
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 添加或修改产能
    addOrUpdateProcessCapacity(params) {
      return new Promise((resolve, reject) => {
        addOrUpdateProcessCapacity(params)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deleteProcessCapacity(params) {
      return new Promise((resolve, reject) => {
        deleteProcessCapacity(params)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getProcessCapacity(pages, size) {
      return new Promise((resolve, reject) => {
        getProcessCapacity(pages, size)
          .then((res) => {
            if (res.code == 200) {
              this.capacity.data = res.data.apsProcessCapacityVo
              this.capacity.totalPages = res.data.pages
              this.capacity.total = res.data.total
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadProcessCapacity(param) {
      return new Promise((resolve, reject) => {
        downloadProcessCapacity(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    importProcessCapacity(param) {
      return new Promise((resolve, reject) => {
        importProcessCapacity(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    processCapacityTemplate(param) {
      return new Promise((resolve, reject) => {
        processCapacityTemplate(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 基础工序方案创建界面
    getProcessCapacityByProductFamily(param) {
      return new Promise((resolve, reject) => {
        getProcessCapacityByProductFamily(param)
          .then((res) => {
            if (res.code == 200) {
              this.createBasePlan.data = res.data
              this.moveData = res.data
            }
            // this.createBasePlan.totalPages = res.data.size
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    saveProcessScheme(param) {
      return new Promise((resolve, reject) => {
        saveProcessScheme(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    //查看基础方案界面
    getProcessSchemeById(id) {
      return new Promise((resolve, reject) => {
        getProcessSchemeById(id)
          .then((res) => {
            if (res.code == 200) {
              this.viewBasePlan.data = res.data.apsProcessSchemeVoList
              this.viewBasePlan.number = res.data.number //人数
              this.viewBasePlan.productFamily = res.data.productFamily
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    updateProcessScheme(param) {
      return new Promise((resolve, reject) => {
        updateProcessScheme(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 基础工艺方案界面
    getProcessScheme(page, size) {
      return new Promise((resolve, reject) => {
        getProcessScheme(page, size)
          .then((res) => {
            if (res.code == 200) {
              this.basePlanList.data = res.data.apsProcessSchemeVos
              this.basePlanList.totalPages = res.data.pages
              this.basePlanList.total = res.data.total
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deleteProcessScheme(list) {
      return new Promise((resolve, reject) => {
        deleteProcessScheme(list)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 最终工艺方案界面
    getProcessSchemeManagement(page, size) {
      return new Promise((resolve, reject) => {
        getProcessSchemeManagement(page, size)
          .then((res) => {
            if (res.code == 200) {
              this.lastPlanList.data = res.data.processSchemeManagementVos
              this.lastPlanList.totalPages = res.data.pages
              this.lastPlanList.total = res.data.total
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    updateProcessSchemeManagement(param) {
      return new Promise((resolve, reject) => {
        updateProcessSchemeManagement(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    updateProcessNumber(param) {
      return new Promise((resolve, reject) => {
        updateProcessNumber(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})

export default processManage

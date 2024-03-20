import { defineStore } from 'pinia'
import {
  getFinishedProduct,
  addOrUpdateFinishedProduct,
  removeFinishedProduct,
  downloadFinishedProduct,
  imporFinishedProduct,
  finishedProductTemplate,
  downloadInventoryFile
} from '@/api/metaData/materialBasicData/finishedProduct'
import { getMetaData, downloadMetaData } from '@/api/metaData/metaDataFilter'
import { getCols, getViews } from '@/api/commonPlan'

const finishedProduct = defineStore('finishedProduct', {
  state: () => ({
    finishedProduct: {
      data: [],
      total: 0,
      pages: 1,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    }
  }),
  actions: {
    getCols(tableId) {
      return new Promise((resolve, reject) => {
        getCols(tableId)
          .then((res) => {
            if (res.code == 200) {
              if (tableId == 65) {
                this.finishedProduct.column = res.data
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
              if (tableId == 65) {
                this.finishedProduct.views = res.data.viewTableVos
                this.finishedProduct.defaultViewId = res.data.defaultViewId
                this.finishedProduct.defaultViewName = res.data.defaultViewName
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
              if (param.tableId == 65) {
                this.finishedProduct.data = res.data.list
                this.finishedProduct.pages = res.data.pages
                this.finishedProduct.total = res.data.total
                if (!param.cols) {
                  this.finishedProduct.viewColumn = res.data.columnTables
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
      if (param.tableId == 65) {
        fileName = '成品基础数据'
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

    getFinishedProduct(page, size) {
      return new Promise((resolve, reject) => {
        getFinishedProduct(page, size)
          .then((res) => {
            this.finishedProduct.data = res.data.list
            this.finishedProduct.pages = res.data.pages
            this.finishedProduct.total = res.data.total
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addOrUpdateFinishedProduct(param) {
      return new Promise((resolve, reject) => {
        addOrUpdateFinishedProduct(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    removeFinishedProduct(param) {
      return new Promise((resolve, reject) => {
        removeFinishedProduct(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadFinishedProduct(param) {
      return new Promise((resolve, reject) => {
        downloadFinishedProduct(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    imporFinishedProduct(param) {
      return new Promise((resolve, reject) => {
        imporFinishedProduct(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    finishedProductTemplate(param) {
      return new Promise((resolve, reject) => {
        finishedProductTemplate(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 导出日别成品库存
    downloadInventoryFile() {
      return new Promise((resolve, reject) => {
        downloadInventoryFile()
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
    }
  }
})

export default finishedProduct

import { defineStore } from 'pinia'
import {
  getRawMaterialBasic,
  addOrUpdateRawMaterial,
  removeRawMaterial,
  downloadRawMaterial,
  imporRawMaterial,
  rawMaterialTemplate,
  downloadInventoryFile
} from '@/api/metaData/materialBasicData/rawBasicData'
import { getMetaData, downloadMetaData } from '@/api/metaData/metaDataFilter'
import { getCols, getViews } from '@/api/commonPlan'

const rawMaterialBasic = defineStore('rawMaterialBasic', {
  state: () => ({
    rawMaterialBasic: {
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
              if (tableId == 66) {
                this.rawMaterialBasic.column = res.data
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
              if (tableId == 66) {
                this.rawMaterialBasic.views = res.data.viewTableVos
                this.rawMaterialBasic.defaultViewId = res.data.defaultViewId
                this.rawMaterialBasic.defaultViewName = res.data.defaultViewName
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
              if (param.tableId == 66) {
                this.rawMaterialBasic.data = res.data.list
                this.rawMaterialBasic.pages = res.data.pages
                this.rawMaterialBasic.total = res.data.total
                if (!param.cols) {
                  this.rawMaterialBasic.viewColumn = res.data.columnTables
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
      if (param.tableId == 66) {
        fileName = '原材料基础数据'
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

    getRawMaterialBasic(page, size) {
      return new Promise((resolve, reject) => {
        getRawMaterialBasic(page, size)
          .then((res) => {
            this.rawMaterialBasic.data = res.data.list
            this.rawMaterialBasic.pages = res.data.pages
            this.rawMaterialBasic.total = res.data.total
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addOrUpdateRawMaterial(param) {
      return new Promise((resolve, reject) => {
        addOrUpdateRawMaterial(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    removeRawMaterial(param) {
      return new Promise((resolve, reject) => {
        removeRawMaterial(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadRawMaterial(param) {
      return new Promise((resolve, reject) => {
        downloadRawMaterial(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    imporRawMaterial(param) {
      return new Promise((resolve, reject) => {
        imporRawMaterial(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    rawMaterialTemplate(param) {
      return new Promise((resolve, reject) => {
        rawMaterialTemplate(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 导出日别原材料库存
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

export default rawMaterialBasic

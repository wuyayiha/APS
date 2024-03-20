import { defineStore } from 'pinia'
import {
  getSemiFinished,
  addOrUpdateSemiFinished,
  removeSemiFinished,
  downloadSemiFinished,
  imporSemiFinished,
  semiFinishedTemplate,
  downloadInventoryFile
} from '@/api/metaData/materialBasicData/semiFinished'
import { getMetaData, downloadMetaData } from '@/api/metaData/metaDataFilter'
import { getCols, getViews } from '@/api/commonPlan'

const semiFinished = defineStore('semiFinished', {
  state: () => ({
    semiMaterial: {
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
                    if (tableId == 64) {
                      this.semiMaterial.column = res.data
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
                    if (tableId == 64) {
                      this.semiMaterial.views = res.data.viewTableVos
                      this.semiMaterial.defaultViewId = res.data.defaultViewId
                      this.semiMaterial.defaultViewName = res.data.defaultViewName
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
                    if (param.tableId == 64) {
                      this.semiMaterial.data = res.data.list
                      this.semiMaterial.pages = res.data.pages
                      this.semiMaterial.total = res.data.total
                      if (!param.cols) {
                        this.semiMaterial.viewColumn = res.data.columnTables
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
            if (param.tableId == 64) {
              fileName = '半成品基础数据'
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

    getSemiFinished(page, size) {
      return new Promise((resolve, reject) => {
        getSemiFinished(page, size)
          .then((res) => {
            this.semiMaterial.data = res.data.list
            this.semiMaterial.pages = res.data.pages
            this.semiMaterial.total = res.data.total
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addOrUpdateSemiFinished(param) {
      return new Promise((resolve, reject) => {
        addOrUpdateSemiFinished(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    removeSemiFinished(param) {
      return new Promise((resolve, reject) => {
        removeSemiFinished(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadSemiFinished(param) {
      return new Promise((resolve, reject) => {
        downloadSemiFinished(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    imporSemiFinished(param) {
      return new Promise((resolve, reject) => {
        imporSemiFinished(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    semiFinishedTemplate(param) {
      return new Promise((resolve, reject) => {
        semiFinishedTemplate(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
      },
    // 导出日别半成品库存
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

export default semiFinished

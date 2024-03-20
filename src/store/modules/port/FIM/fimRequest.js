import { defineStore } from 'pinia'
import {
  getFimRequestPage,
  addOrUpdateFimRequest,
  importInterfaceData,
  downloadFimPriority,
  removeFimRequest,
  downloadFimRequest,
  fimRequestTemplate,
  getFimPriority,
  getFimPriorityFiltrate,
  getFimRequestPageFilter
} from '@/api/port/FIM/fimRequest'
import { getCols, getViews } from '@/api/commonPlan'

const fimRequest = defineStore('fimRequest', {
  state: () => ({
    fimRequest: {
      data: [],
      pages: 1,
      total: 0,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },
    fimPriority: {
      data: [],
      pages: 1,
      total: 0,
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
              if (tableId == 48) {
                this.fimPriority.column = res.data
              } else if (tableId == 35) {
                this.fimRequest.column = res.data
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
              if (tableId == 48) {
                this.fimPriority.views = res.data.viewTableVos
                this.fimPriority.defaultViewId = res.data.defaultViewId
                this.fimPriority.defaultViewName = res.data.defaultViewName
              } else if (tableId == 35) {
                this.fimRequest.views = res.data.viewTableVos
                this.fimRequest.defaultViewId = res.data.defaultViewId
                this.fimRequest.defaultViewName = res.data.defaultViewName
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getFimPriorityFiltrate(param, page, size) {
      return new Promise((resolve, reject) => {
        getFimPriorityFiltrate(param, page, size)
          .then((res) => {
            if (res.code == 200) {
              this.fimPriority.data = res.data.list
              this.fimPriority.pages = res.data.pages
              this.fimPriority.total = res.data.total
              if (!param.cols) {
                this.fimPriority.viewColumn = res.data.columnTables
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
      },
      getFimRequestPageFilter(param, page, size) {
        return new Promise((resolve, reject) => {
            getFimRequestPageFilter(param, page, size)
            .then((res) => {
              if (res.code == 200) {
                this.fimRequest.data = res.data.list
                this.fimRequest.pages = res.data.pages
                this.fimRequest.total = res.data.total
                if (!param.cols) {
                  this.fimRequest.viewColumn = res.data.columnTables
                }
              }
              resolve(res)
            })
            .catch((error) => {
              reject(error)
            })
        })
      },

    getFimRequestPage(page, size) {
      return new Promise((resolve, reject) => {
        getFimRequestPage(page, size)
          .then((res) => {
            if (res.code == 200) {
              this.fimRequest.data = res.data.list
              this.fimRequest.pages = res.data.pages
              this.fimRequest.total = res.data.total
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getFimPriority(page, size) {
      return new Promise((resolve, reject) => {
        getFimPriority(page, size)
          .then((res) => {
            if (res.code == 200) {
              this.fimPriority.data = res.data.list
              this.fimPriority.pages = res.data.pages
              this.fimPriority.total = res.data.total
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addOrUpdateFimRequest(param) {
      return new Promise((resolve, reject) => {
        addOrUpdateFimRequest(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    removeFimRequest(param) {
      return new Promise((resolve, reject) => {
        removeFimRequest(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadFimRequest(param) {
      return new Promise((resolve, reject) => {
        downloadFimRequest(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fimRequestTemplate() {
      return new Promise((resolve, reject) => {
        fimRequestTemplate()
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    importInterfaceData(param) {
      return new Promise((resolve, reject) => {
        importInterfaceData(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadFimPriority(param) {
      return new Promise((resolve, reject) => {
        downloadFimPriority(param)
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

export default fimRequest

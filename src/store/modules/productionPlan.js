import { defineStore } from 'pinia'
import {
  getProductionFiltrate,
  semiFinishedGoodsFiltrate,
  semiMaterialShortageFiltrate,
  materialShortageAnalysisFiltrate,
  downloadTable
} from '@/api/productionPlan'
import { getCols, getViews } from '@/api/commonPlan'

const productionPlan = defineStore('productionPlan', {
  state: () => ({
    tables: {
      40: 'productPlan'
    },
    searchResult: [],
    productPlan: {
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

    semiFinishedProducts: {
      data: [],
      pages: 1,
      total: 0,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },

    productPlanMaterialShort: {
      data: [],
      pages: 1,
      total: 0,
      column: [],
      views: [],
      viewColumn: [],
      defaultViewId: null,
      defaultViewName: ''
    },

    sFMaterialShort: {
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
              if (tableId == 40) {
                this.productPlan.column = res.data
              } else if (tableId == 42) {
                this.semiFinishedProducts.column = res.data
              } else if (tableId == 44) {
                this.productPlanMaterialShort.column = res.data
              } else if (tableId == 46) {
                this.sFMaterialShort.column = res.data
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
              if (tableId == 40) {
                this.productPlan.views = res.data.viewTableVos
                this.productPlan.defaultViewId = res.data.defaultViewId
                this.productPlan.defaultViewName = res.data.defaultViewName
              } else if (tableId == 42) {
                this.semiFinishedProducts.views = res.data.viewTableVos
                this.semiFinishedProducts.defaultViewId = res.data.defaultViewId
                this.semiFinishedProducts.defaultViewName =
                  res.data.defaultViewName
              } else if (tableId == 44) {
                this.productPlanMaterialShort.views = res.data.viewTableVos
                this.productPlanMaterialShort.defaultViewId =
                  res.data.defaultViewId
                this.productPlanMaterialShort.defaultViewName =
                  res.data.defaultViewName
              } else if (tableId == 46) {
                this.sFMaterialShort.views = res.data.viewTableVos
                this.sFMaterialShort.defaultViewId = res.data.defaultViewId
                this.sFMaterialShort.defaultViewName = res.data.defaultViewName
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getProductionFiltrate(param, page, size) {
      return new Promise((resolve, reject) => {
        getProductionFiltrate(param, page, size)
          .then((res) => {
            if (res.code == 200) {
              this.productPlan.data = res.data.list
              this.productPlan.pages = res.data.pages
              this.productPlan.total = res.data.total
              if (!param.cols) {
                this.productPlan.viewColumn = res.data.columnTables
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    semiFinishedGoodsFiltrate(param, page, size) {
      return new Promise((resolve, reject) => {
        semiFinishedGoodsFiltrate(param, page, size)
          .then((res) => {
            if (res.code == 200) {
              this.semiFinishedProducts.data = res.data.list
              this.semiFinishedProducts.pages = res.data.pages
              this.semiFinishedProducts.total = res.data.total
              if (!param.cols) {
                this.semiFinishedProducts.viewColumn = res.data.columnTables
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    materialShortageAnalysisFiltrate(param, page, size) {
      return new Promise((resolve, reject) => {
        materialShortageAnalysisFiltrate(param, page, size)
          .then((res) => {
            if (res.code == 200) {
              this.productPlanMaterialShort.data = res.data.list
              this.productPlanMaterialShort.pages = res.data.pages
              this.productPlanMaterialShort.total = res.data.total
              if (!param.cols) {
                this.productPlanMaterialShort.viewColumn = res.data.columnTables
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    semiMaterialShortageFiltrate(param, page, size) {
      return new Promise((resolve, reject) => {
        semiMaterialShortageFiltrate(param, page, size)
          .then((res) => { 
            if (res.code == 200) {
              this.sFMaterialShort.data = res.data.list
              this.sFMaterialShort.pages = res.data.pages
              this.sFMaterialShort.total = res.data.total
              if (!param.cols) {
                this.sFMaterialShort.viewColumn = res.data.columnTables
              }
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadTable(param) {
        return new Promise((resolve, reject) => {
          downloadTable(param)
           .then((res) => {
               
            })
           .catch((error) => {
              reject(error)
            })
        })
    }
  }
})

export default productionPlan

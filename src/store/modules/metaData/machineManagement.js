import { defineStore } from 'pinia'
import {
  getApsMachineTable,
  addOrUpdateApsMachineTable,
  downloadMachineTableTemplate,
  deleteApsMachineTable,
  downloadApsMachineTable,
  importMachineTable
} from '@/api/metaData/machineManagement'
import { getMetaData, downloadMetaData } from '@/api/metaData/metaDataFilter'
import { getCols, getViews } from '@/api/commonPlan'

const machineManagement = defineStore('machineManagement', {
  state: () => ({
    machine: {
      data: [],
      pages: 1,
      total: 1,
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
              if (tableId == 68) {
                this.machine.column = res.data
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
              if (tableId == 68) {
                this.machine.views = res.data.viewTableVos
                this.machine.defaultViewId = res.data.defaultViewId
                this.machine.defaultViewName = res.data.defaultViewName
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
              if (param.tableId == 68) {
                this.machine.data = res.data.list
                this.machine.pages = res.data.pages
                this.machine.total = res.data.total
                if (!param.cols) {
                  this.machine.viewColumn = res.data.columnTables
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
      if (param.tableId == 68) {
        fileName = '机器管理'
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

    getApsMachineTable(page, size) {
      return new Promise((resolve, reject) => {
        getApsMachineTable(page, size)
          .then((res) => {
            this.machine.data = res.data.apsProductFamilyMachineTables
            this.machine.pages = res.data.pages
            this.machine.total = res.data.total
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addOrUpdateApsMachineTable(data) {
      return new Promise((resolve, reject) => {
        addOrUpdateApsMachineTable(data)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deleteApsMachineTable(list) {
      return new Promise((resolve, reject) => {
        deleteApsMachineTable(list)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadApsMachineTable(param) {
      return new Promise((resolve, reject) => {
        downloadApsMachineTable(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    importMachineTable(param) {
      return new Promise((resolve, reject) => {
        importMachineTable(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downloadMachineTableTemplate(param) {
      return new Promise((resolve, reject) => {
        downloadMachineTableTemplate(param)
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

export default machineManagement

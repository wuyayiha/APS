import { defineStore } from 'pinia'
import {
  getAllPage,
  addOrUpdate,
  remove
} from '@/api/metaData/attendanceManagement'
import {importAttendance,attendanceTemplate} from '@/api/metaData/attendanceManagement'
import { getMetaData, downloadMetaData } from '@/api/metaData/metaDataFilter'
import { getCols, getViews } from '@/api/commonPlan'
const attendanceManagement = defineStore('attendanceManagement', {
  state: () => ({
    attendance: {
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
              if (tableId == 67) {
                this.attendance.column = res.data
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
              if (tableId == 67) {
                this.attendance.views = res.data.viewTableVos
                this.attendance.defaultViewId = res.data.defaultViewId
                this.attendance.defaultViewName = res.data.defaultViewName
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
              if (param.tableId == 67) {
                this.attendance.data = res.data.list
                this.attendance.pages = res.data.pages
                this.attendance.total = res.data.total
                if (!param.cols) {
                  this.attendance.viewColumn = res.data.columnTables
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
      if (param.tableId == 67) {
        fileName = '出勤管理'
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
    importAttendance(param) {
      return new Promise((resolve, reject) => {
        importAttendance(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    attendanceTemplate(param) {
      return new Promise((resolve, reject) => {
        attendanceTemplate(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },


    getAllPage(page, size) {
      return new Promise((resolve, reject) => {
        getAllPage(page, size)
          .then((res) => {
            this.attendance.data = res.data.list
            this.attendance.pages = res.data.pages
            this.attendance.total = res.data.total
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addOrUpdate(param) {
      return new Promise((resolve, reject) => {
        addOrUpdate(param)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    remove(param) {
      return new Promise((resolve, reject) => {
        remove(param)
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
export default attendanceManagement

import { defineStore } from "pinia";
import {
    getDailyDataList, downloadDailyData, importloadDailyData,
    downloadDailyDataUploadTemplate, addOrUpdateDailyData, removeDailyData,
    getDailyDataFilter
} from '@/api/port/Mes/dailyDataUpload';
import { getCols, getViews } from '@/api/commonPlan'

const dailyDataUpload = defineStore(
    'dailyDataUpload',
    {
        state: () => ({
            dailyDataUpload: {
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
            getDailyDataList(page,size) {
                return new Promise((resolve, reject) => {
                    getDailyDataList(page,size).then(res => {
                        this.dailyDataUpload.data = res.data.list
                        this.dailyDataUpload.pages = res.data.pages
                        this.dailyDataUpload.total = res.data.total
                        resolve(res)
                    }).catch(error => {
                        
                        reject(error)
                    })
                })
            },
            downloadDailyData(param) {
                return new Promise((resolve, reject) => {
                    downloadDailyData(param).then(res => {
                        
                        resolve(res)
                    }).catch(error => {
                        
                        reject(error)
                    })
                })
            },
            importloadDailyData(param) {
                return new Promise((resolve, reject) => {
                    importloadDailyData(param).then(res => {
                        
                        resolve(res)
                    }).catch(error => {
                        
                        reject(error)
                    })
                })
            },
            downloadDailyDataUploadTemplate() {
                return new Promise((resolve, reject) => {
                    downloadDailyDataUploadTemplate().then(res => {
                        
                        resolve(res)
                    }).catch(error => {
                        
                        reject(error)
                    })
                })
            },
            addOrUpdateDailyData(param) {
                return new Promise((resolve, reject) => {
                    addOrUpdateDailyData(param).then(res => {
                        
                        resolve(res)
                    }).catch(error => {
                        
                        reject(error)
                    })
                })
            },
            removeDailyData(param) {
                return new Promise((resolve, reject) => {
                    removeDailyData(param).then(res => {
                        
                        resolve(res)
                    }).catch(error => {
                        
                        reject(error)
                    })
                })
            },


            getCols(tableId) {
                return new Promise((resolve, reject) => {
                  getCols(tableId)
                    .then((res) => {
                      if (res.code == 200) {
                        this.dailyDataUpload.column = res.data
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
                          this.dailyDataUpload.views = res.data.viewTableVos
                          this.dailyDataUpload.defaultViewId = res.data.defaultViewId
                          this.dailyDataUpload.defaultViewName = res.data.defaultViewName
                      }
                      resolve(res)
                    })
                    .catch((error) => {
                      reject(error)
                    })
                })
              },
            getDailyDataFilter(param,page,size) {
                return new Promise((resolve, reject) => {
                    getDailyDataFilter(param,page,size).then(res => {
                        this.dailyDataUpload.data = res.data.list
                        this.dailyDataUpload.pages = res.data.pages
                        this.dailyDataUpload.total = res.data.total
                        if (!param.cols) {
                            this.dailyDataUpload.viewColumn = res.data.columnTables
                        }
                        resolve(res)
                    }).catch(error => {
                        
                        reject(error)
                    })
                })
            },
        }
    }
)
export default dailyDataUpload
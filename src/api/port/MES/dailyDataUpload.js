import request from '@/utils/request'
import { download, uploadFile } from '@/utils/request';
import { getToken } from '@/utils/auth'

export function getDailyDataList(page,size) {
    return request({    
        url: `/interface/getDailyDataList/${page}/${size}`,
        method: 'get',
    })
}
// 查询日别数据（加了筛选）
export function getDailyDataFilter(param,page,size) {
    return request({    
        url: `/interface/getDailyDataFilter/${page}/${size}`,
        method: 'post',
        data:param
    })
}
// 导出
export function downloadDailyData(param) {
    return download('/interface/downloadDailyData', param, '日别数据',{
        headers: {
            token: getToken()
        }
    });
}
// 导入
export function importloadDailyData(param) {
    return uploadFile(param, '/interface/importloadDailyData')
}
// 下载导入模板
export function downloadDailyDataUploadTemplate(param) {
    return download('/interface/downloadDailyDataUploadTemplate', param, '日别数据导入模板',{
        headers: {
            token: getToken()
        }
    });
}
// 增加和修改
export function addOrUpdateDailyData(param) {
    return request({    
        url: '/interface/addOrUpdateDailyData',
        method: 'post',
        data:param
    })
}
// 删除
export function removeDailyData(param) {
    return request({    
        url: '/interface/removeDailyData',
        method: 'post',
        data:param
    })
}

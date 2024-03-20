import request from '@/utils/request'
import { download,uploadFile } from '../../../utils/request';
import { getToken } from '@/utils/auth'

export function getSemiFinished(pages,size) {
    return request({    
        url: `/material/getSemiFinished/${pages}/${size}`,
        method: 'get',
    })
}

export function addOrUpdateSemiFinished(param) {
    return request({    
        url: '/material/addOrUpdateSemiFinished',
        method: 'post',
        data:param
    })
}

export function removeSemiFinished(param) {
    return request({
        url: '/material/removeSemiFinished',
        method: 'post',
        data:param
    })
}


export function downloadSemiFinished(param) {
    // 使用封装的 download 方法
    return download('/material/downloadSemiFinished', param, '半成品基础数据',{
        headers: {
            token: getToken()
        }
    });
}

export function imporSemiFinished(param) {
    return uploadFile(param, '/material/imporSemiFinished')
}

export function semiFinishedTemplate(param) {
    // 使用封装的 download 方法
    return download('/material/semiFinishedTemplate', param, '半成品基础数据导入模板',{
        headers: {
            token: getToken()
        }
      });
}

//导出日别半成品库存
export function downloadInventoryFile() {
    // 使用封装的 download 方法
    return download('/scResult/downloadInventoryFile?filenum=1', {}, '日别半成品库存',{
        headers: {
            token: getToken()
        }
    });
}
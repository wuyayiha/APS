import request from '@/utils/request'
import { download,uploadFile } from '../../../utils/request';
import { getToken } from '@/utils/auth'

export function getFinishedProduct(pages,size) {
    return request({    
        url: `/material/getFinishedProduct/${pages}/${size}`,
        method: 'get',
    })
}

export function addOrUpdateFinishedProduct(param) {
    return request({    
        url: '/material/addOrUpdateFinishedProduct',
        method: 'post',
        data:param
    })
}

export function removeFinishedProduct(param) {
    return request({
        url: '/material/removeFinishedProduct',
        method: 'post',
        data:param
    })
}


export function downloadFinishedProduct(param) {
    // 使用封装的 download 方法
    return download('/material/downloadFinishedProduct', param, '成品基础数据',{
        headers: {
            token: getToken()
        }
    });
}

export function imporFinishedProduct(param) {
    return uploadFile(param, '/material/imporFinishedProduct')
}

export function finishedProductTemplate(param) {
    // 使用封装的 download 方法
    return download('/material/finishedProductTemplate', param, '成品基础数据导入模板',{
        headers: {
            token: getToken()
        }
      });
}

//导出日别成品库存
export function downloadInventoryFile() {
    // 使用封装的 download 方法
    return download('/scResult/downloadInventoryFile?filenum=2', {}, '日别成品库存',{
        headers: {
            token: getToken()
        }
    });
}
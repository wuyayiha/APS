import request from '@/utils/request'
import { download, uploadFile } from '@/utils/request';
import {getToken} from '@/utils/auth'

export function getAllPage(page,size,type) {
    return request({    
        url: `/interface/getAllPage/${page}/${size}?type=${type}`,
        method: 'get',
    })
}

export function getPageFiltrate(param,page,size) {
    return request({
        url: `/interface/getPageFiltrate/${page}/${size}`,
        method: 'post',
        data:param
    })
}

export function add(param,type) {
    return request({    
        url: `/interface/add?type=${type}`,
        method: 'post',
        data:param
    })
}

export function update(param,type) {
    return request({    
        url: `/interface/update?type=${type}`,
        method: 'post',
        data:param
    })
}

export function deleteData(param,type) {
    return request({    
        url: `/interface/delete?type=${type}`,
        method: 'post',
        data:param
    })
}
// 导出
export function downloadInterfaceDate(param,fileName) {
    return download(`/interface/downloadInterfaceDate`, param, fileName,{
        headers: {
            token: getToken()
        }
      });
}
// 导入
export function importInterfaceData(param,code) {
    return uploadFile(param, `/interface/importInterfaceData?code=${code}`)
}
// 下载模板
export function downloadInterfaceTemplate(type,param,fileName) {
    return download(`/interface/downloadInterfaceTemplate?type=${type}`,param, fileName,{
        headers: {
            token: getToken()
        }
    });
}
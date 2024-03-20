import request from '@/utils/request'
import { download, uploadFile } from '@/utils/request';
import { getToken } from '@/utils/auth'

export function getFimRequestPage(page,size) {
    return request({    
        url: `/fimData/getFimRequestPage/${page}/${size}`,
        method: 'get',
    })
}

export function getFimPriority(page,size) {
    return request({    
        url: `/scResult/getFimPriority/${page}/${size}`,
        method: 'get',
    })
}

// FIM优先级
export function getFimPriorityFiltrate(param,page,size) {
    return request({    
        url: `/scResult/getFimPriorityFiltrate/${page}/${size}`,
        method: 'post',
        data:param
    })
}

// FIM需求
export function getFimRequestPageFilter(param,page,size) {
    return request({    
        url: `/interface/getPageFiltrate/${page}/${size}`,
        method: 'post',
        data:param
    })
}

export function addOrUpdateFimRequest(param) {
    return request({    
        url: '/fimData/addOrUpdateFimRequest',
        method: 'post',
        data:param
    })
}

export function removeFimRequest(param) {
    return request({    
        url: 'fimData/removeFimRequest',
        method: 'post',
        data:param
    })
}
// 导出FIM需求
export function downloadFimRequest(param){
    // return download('/fimData/download', param, 'FIM需求表',{
    return download('/interface/downloadInterfaceDate', param, 'FIM需求表',{
        headers: {
            token: getToken()
        }
    });
}
// 下载导入模板
export function fimRequestTemplate(){
    return download('/fimData/fimRequestTemplate', '', 'FIM需求表导入模板',{
        headers: {
            token: getToken()
        }
    });
}
// 导入
export function importInterfaceData(param) {
    return uploadFile(param, '/fimData/importFimRequest')
}
// 导出FIM优先级
export function downloadFimPriority(param){
    return download('/scResult/downloadFimPriority', param, 'FIM优先级',{
        headers: {
            token: getToken()
        }
    });
}
import request from '@/utils/request'
import { download,uploadFile } from '../../utils/request';
import {getToken} from '@/utils/auth'

export function getApsMachineTable(pages,size) {
    return request({
        url: `/machine/getApsMachineTable/${pages}/${size}`,
        method: 'get',
    })
}

export function addOrUpdateApsMachineTable(data) {
    return request({
        url: `/machine/addOrUpdateApsMachineTable`,
        method: 'post',
        data:data
    })
}
export function deleteApsMachineTable(list) {
    return request({
        url: `/machine/deleteApsMachineTable`,
        method: 'post',
        data:list
    })
}
//导出
export function downloadApsMachineTable(param) {
    // 使用封装的 download 方法
    return download('/machine/downloadApsMachineTable', param, '机器管理',{
        headers: {
            token: getToken()
        }
      });
}
// 导入
export function importMachineTable(param) {
    return uploadFile(param,'/machine/importMachineTable')
}
// 下载模板
export function downloadMachineTableTemplate(param) {
    // 使用封装的 download 方法
    return download('/machine/downloadMachineTableTemplate', param, '机器管理导入模板',{
        headers: {
            token: getToken()
        }
      });
}
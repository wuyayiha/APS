import request from '@/utils/request'
import { download } from '../utils/request'
export function updateData(update) {
    return request({
        url: '/scheduling/dataUpdate',
        method: 'post',
        data:update
    })
}

export function getPageLock(){
    return request({
        url: '/scheduling/getPageLock',
        method:'post'
    })
}

export function lockRenewal(){
    return request({
        url: '/scheduling/lockRenewal',
        method:'post'
    })
}

export function closeLock(){
    return request({
        url: '/scheduling/closeLock',
        method:'post'
    })
}
export function startScheduling(params){
    return request({
        url: '/scheduling/startScheduling',
        method: 'post',
        data:params
    })
}

export function integrityChecker(){
    return request({
        url: '/scheduling/integrityChecker',
        method:'post'
    })
}

export function oneKeyScheduling(params){
    return request({
        url: '/scheduling/oneKeyScheduling',
        method: 'post',
        data:params
    })
}

import {getToken} from '../utils/auth'
// 下载完整性检查的错误详情
export function downloadIntegrityChecker(param) {

    // 使用封装的 download 方法
    return download('scheduling/downloadIntegrityChecker', param, '不完整数据',{
        headers: {
            token: getToken()
        }
      });
}
  

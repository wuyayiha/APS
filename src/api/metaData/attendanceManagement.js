import request from '@/utils/request'
import { download,uploadFile } from '../../utils/request';
import {getToken} from '@/utils/auth'

export function getAllPage(page,size) {
    return request({
        url: `attendance/list/${page}/${size}`,
        method:'get'
    })
}

export function addOrUpdate(param) {
    return request({
        url: 'attendance/addOrUpdate',
        method: 'post',
        data:param
    })
}

export function remove(param) {
    return request({
        url: 'attendance/remove',
        method: 'post',
        data:param
    })
}

export function importAttendance(param) {
    return uploadFile(param,'/attendance/importAttendance')
}
// 下载模板
export function attendanceTemplate(param) {
    // 使用封装的 download 方法
    return download('/attendance/attendanceTemplate', param, '出勤管理导入模板',{
        headers: {
            token: getToken()
        }
      });
}
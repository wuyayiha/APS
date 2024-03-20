import request from '@/utils/request'
import { download } from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getMetaData(param, pages, size) {
  return request({
    url: `/masterData/get/${pages}/${size}`,
    method: 'post',
    data: param
  })
}
// 导出主数据
export function downloadMetaData(param,fileName) {
    // 使用封装的 download 方法
    return download('/masterData/download', param, fileName,{
        headers: {
            token: getToken()
        }
    });
}
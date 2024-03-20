import request from '@/utils/request'

// 获取常用功能
export function getFavorites() {
  return request({
    url: 'system/index/commonFunctions',
    method: 'get'
  })
}

// 更新常用功能
export function updateFavorites(param) {
  return request({
    url: 'system/index/updateCommonFunctions',
    method: 'post',
    data: param
  })
}
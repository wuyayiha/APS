import request from '@/utils/request'

export function getGttData() {
  return request({
    url: '/scResult/getProductionPlanSort',
    method: 'get'
  })
}
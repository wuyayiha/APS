import request from '@/utils/request'
import { download } from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getProductionFiltrate(param, pages, size) {
  return request({
    url: `/scResult/getProductionFiltrate/${pages}/${size}`,
    method: 'post',
    data: param
  })
}

export function semiFinishedGoodsFiltrate(param, pages, size) {
  return request({
    url: `/scResult/semiFinishedGoodsFiltrate/${pages}/${size}`,
    method: 'post',
    data: param
  })
}

// 成品缺料分析
export function materialShortageAnalysisFiltrate(param, pages, size) {
  return request({
    url: `/scResult/materialShortageAnalysisFiltrate/${pages}/${size}`,
    method: 'post',
    data: param
  })
}
//半成品缺料分析
export function semiMaterialShortageFiltrate(param, pages, size) {
  return request({
    url: `/scResult/semiMaterialShortageFiltrate/${pages}/${size}`,
    method: 'post',
    data: param
  })
}
// 导出生产计划和FIM优先级
export function downloadTable(param) {
  let fileName = ''
  if (param.tableId == 48) {
    fileName = 'FIM优先级'
  } else if (param.tableId == 40) {
    fileName = '成品生产计划'
  } else if (param.tableId == 42) {
    fileName = '半成品生产计划'
  } else if (param.tableId == 44) {
    fileName = '成品缺料分析'
  } else if (param.tableId == 46) {
    fileName = '半成品缺料分析'
  }
  // 使用封装的 download 方法
  return download('/scResult/download', param, fileName, {
    headers: {
      token: getToken()
    }
  })
}

import request from '@/utils/request'
import { download,uploadFile } from '../../../utils/request';
import { getToken } from '@/utils/auth'

export function getRawMaterialBasic(pages,size) {
    return request({    
        url: `/material/getRawMaterialBasic/${pages}/${size}`,
        method: 'get',
    })
}

export function addOrUpdateRawMaterial(param) {
    return request({    
        url: '/material/addOrUpdateRawMaterial',
        method: 'post',
        data:param
    })
}

export function removeRawMaterial(param) {
    return request({    
        url: '/material/removeRawMaterial',
        method: 'post',
        data:param
    })
}

//导出工序命名池
export function downloadRawMaterial(param) {
    // 使用封装的 download 方法
    return download('/material/downloadRawMaterial', param, '原材料基础数据',{
        headers: {
            token: getToken()
        }
    });
}
// 导入工序命名池
export function imporRawMaterial(param) {
    return uploadFile(param, '/material/imporRawMaterial')
}
// 下载工序命名池的导入模板
export function rawMaterialTemplate(param) {
    // 使用封装的 download 方法
    return download('/material/rawMaterialTemplate', param, '原材料基础数据导入模板',{
        headers: {
            token: getToken()
        }
      });
}

//导出日别原材料库存
export function downloadInventoryFile() {
    // 使用封装的 download 方法
    return download('/scResult/downloadInventoryFile?filenum=1', {}, '日别原材料库存',{
        headers: {
            token: getToken()
        }
    });
}
import request from '@/utils/request'
import { download,uploadFile } from '../../utils/request';
import { getToken } from '@/utils/auth'
// 工序命名池界面
// 新增和修改共用的接口，新增我就传name，修改我就传id和name
export function updateProcessName(params) {
    const data = {};

    if (params.id) { // 如果传递了 id，则表示是修改操作
        data.id = params.id;
    }

    if (params.processName) { // name 是共用的字段，无论是新增还是修改
        data.processName = params.processName;
    }

    return request({    
        url: '/process/updateProcessName',
        method: 'post',
        data:data
      })
}
//查询工序名称，什么都不传查全部，传名字查具体
export function getProcessNamePools() {
    return request({    
        url: '/process/getProcessNamePools',
        method: 'get',
    })
}
export function getProcessNamePoolsPages(pages,size) {
    return request({    
        url: `/process/getProcessNamePools/${pages}/${size}`,
        method: 'get',
    })
}

// 删除工序名称
export function deleteProcessName(params) {
    return request({    
        url: '/process/deleteProcessName',
        method: 'post',
        data:params
    })
}
//导出工序命名池
export function downloadProceeName(param) {
    // 使用封装的 download 方法
    return download('/process/downloadProceeName', param, '工序名称',{
        headers: {
            token: getToken()
        }
    });
}
// 导入工序命名池
export function uploadNameFile(param) {
    return uploadFile(param, '/process/importProceeName')
}
// 下载工序命名池的导入模板
export function proceeNameTemplate(param) {
    // 使用封装的 download 方法
    return download('/process/proceeNameTemplate', param, '工序命名池导入模板',{
        headers: {
            token: getToken()
        }
      });
}
// 工序与产能界面
//获取包装方式
export function getAllPackagingMethod() {
    return request({    
        url: '/process/getAllPackagingMethod',
        method: 'get',
    })
}
//获取产品族
export function getAllProductFamily() {
    return request({    
        url: '/process/getAllProductFamily',
        method: 'get',
    })
}
//添加或修改产能
export function addOrUpdateProcessCapacity(params) {
    return request({    
        url: '/process/addOrUpdateProcessCapacity',
        method: 'post',
        data:params
    })
}

export function deleteProcessCapacity(params) {
    return request({    
        url: '/process/deleteProcessCapacity',
        method: 'post',
        data:params
    })
}

export function getProcessCapacity(pages,size) {
    return request({    
        url: `/process/getProcessCapacity/${pages}/${size}`,
        method: 'get',
    })
}
//导出工序与产能
export function downloadProcessCapacity(param) {
    // 使用封装的 download 方法
    return download('/process/downloadProcessCapacity', param, '工序与产能',{
        headers: {
            token: getToken()
        }
      });
}
// 导入工序与产能
export function importProcessCapacity(param) {
    return uploadFile(param, 'process/importProcessCapacity')
}
// 下载工序与产能的导入模板
export function processCapacityTemplate(param) {
    // 使用封装的 download 方法
    return download('/process/processCapacityTemplate', param, '工序与产能导入模板',{
        headers: {
            token: getToken()
        }
      });
}
// 创建基本工序方案界面
export function getProcessCapacityByProductFamily(param) {
    return request({    
        url: `/process/getProcessCapacityByProductFamily?productFamily=${param}`,
        method: 'get',
    })
}

export function saveProcessScheme(param) {
    const data = {
        apsProcessSchemeParam: param.data,
        number:param.number
    }
    return request({    
        url: '/process/saveProcessScheme',
        method: 'post',
        data:data
    })
}
// 查看基本工序方案界面
export function getProcessSchemeById(id) {
    return request({    
        url: `/process/getProcessSchemeById?id=${id}`,
        method: 'get',
    })
}

export function updateProcessScheme(param) {
    // const data = {
    //     apsProcessSchemeParam: param.data,
    //     number:param.number
    // }
    return request({    
        url: '/process/updateProcessScheme',
        method: 'post',
        data:param
    })
}

export function getProcessScheme(pages,size) {
    return request({    
        url: `/process/getProcessScheme/${pages}/${size}`,
        method: 'get',
    })
}

export function deleteProcessScheme(param) {
    return request({    
        url: '/process/deleteProcessScheme',
        method: 'post',
        data:param
    })
}

export function getProcessSchemeManagement(page,size) {
    return request({    
        url: `/process/getProcessSchemeManagement/${page}/${size}`,
        method: 'get',
    })
}

export function updateProcessSchemeManagement(param) {
    return request({    
        url: '/process/updateProcessSchemeManagement',
        method: 'post',
        data:param
    })
}

export function updateProcessNumber(param) {
    return request({    
        url: '/process/updateProcessNumber',
        method: 'post',
        data:param
    })
}
import request from "@/utils/request";

// 获取视图列表
export function getViews(tableId) {
    return request({
        url: `/filtrate/getViews/${tableId}`,
        method: 'get',
    })
}
// 获取全部列
export function getCols(tableId) {
    return request({    
        url: `/filtrate/getCols/${tableId}`,
        method: 'get',
    })
}
// 保存视图
export function saveView(param) {
    return request({    
        url: '/filtrate/saveView',
        method: 'post',
        data:param
    })
}

// 删除视图
export function removeView(param) {
    return request({    
        url: '/filtrate/removeView',
        method: 'post',
        data:param
    })
}

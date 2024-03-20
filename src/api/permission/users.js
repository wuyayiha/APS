import request from '@/utils/request'

export function addUser(username,password,deptId) {
    const data = {
        username,
        password,
        deptId
    }
    return request({
      url: '/system/sysUser/save',
      method: 'post',
      data:data
    })
}

export function removeUser(id) {
    return request({
      url: '/system/sysUser/remove',
      method: 'post',
      data:id
    })
  }
  
export function removeMoreUser(list) {
    return request({
      url: '/system/sysUser/batchRemove',
      method: 'post',
      data:list
      })
}
// 获取全部部门信息，并已树形返回
export function getDept() {
    return request({
        url: '/admin/system/sysDept/findDepts',
        method: 'get',
    })
}


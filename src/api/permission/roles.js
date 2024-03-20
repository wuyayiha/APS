import request from '@/utils/request'


export function findAll() {
  return request({
    url: '/admin/system/sysRole/findAll',
    methods: 'get'
  })
}

export function addRole(roleName, roleCode, description, dataScope) {
  const data = {
    roleName,
    roleCode,
    description,
    dataScope
  }
  return request({
    url: '/admin/system/sysRole/save',
    method: 'post',
    data:data
  })
}

export function updateRole(roleId,roleName, roleCode, description, dataScope) {
  const data = {
    roleId,
    roleName,
    roleCode,
    description,
    dataScope
  }
  return request({
    url: '/admin/system/sysRole/update',
    method: 'post',
    data:data
  })
}

export function removeRole(id) {
  return request({
    url: '/admin/system/sysRole/remove',
    method: 'post',
    data:id
  })
}

export function removeMoreRole(list) {
  return request({
    url: '/admin/system/sysRole/batchRemove',
    method: 'post',
    data:list
    })
}
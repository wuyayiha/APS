import { defineStore } from 'pinia'
import {findAll,addRole,updateRole,removeRole,removeMoreRole} from '@/api/permission/roles'

const rolesManage = defineStore(
    'rolesManage',
    {
        state: () => ({
            roles: [
                {
                    id: 1,
                    roleName: '管理员',
                    dataScope: '1',
                    create_time: '2023-9-23',
                    update_time: '2023-10-1',
                }
            ],
        }),
        actions: {
            findAll() {
                return new Promise((resolve, reject) => {
                    findAll().then(res => {
                        this.roles=res.data
                        resolve(res)
                    }).catch(error => {
                        console.log('角色findAll代码报错')
                        reject(error)
                    })
                })
            },
            addRole(roleName, roleCode, description, dataScope) {
                return new Promise((resolve, reject) => {
                    addRole(roleName, roleCode, description, dataScope).then(res => {
                        this.roles.push( res.data )
                        console.log('store角色添加成功', res.data)
                        console.log(this.roles)
                        resolve(res)
                    }).catch(error => {
                        console.log('store中角色添加失败')
                        reject(error)
                    })
                })
            },
            updateRole(roleId,roleName, roleCode, description, dataScope) {
                return new Promise((resolve, reject) => {
                    updateRole(roleId,roleName, roleCode, description, dataScope).then(res => {
                        console.log('store角色修改成功', res.data)
                        resolve(res)
                    }).catch(error => {
                        console.log('store中角色修改失败')
                        reject(error)
                    })
                })
            },
            removeRole(id) {
                return new Promise((resolve, reject) => {
                    removeRole(id).then(res => {
                        console.log('store角色删除成功', res.data)
                        resolve(res)
                    }).catch(error => {
                        console.log('store中角色删除失败')
                        reject(error)
                    })
                })
            },
            removeMoreRole(list) {
                return new Promise((resolve, reject) => {
                    removeMoreRole(list).then(res => {
                        console.log('store批量角色删除成功', res.data)
                        resolve(res)
                    }).catch(error => {
                        console.log('store中批量角色删除失败')
                        reject(error)
                    })
                })
            }
        }
    }
)
export default rolesManage
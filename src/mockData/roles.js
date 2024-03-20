import Mock from 'mockjs';

// 使用 Mock.js 拦截获取用户信息的请求
// 获取所有角色
Mock.mock('/admin/system/sysRole/findAll', 'get', () => {
    const roles = [
        {
            "id": "1",
            "createTime": "2021-05-31 18:09:18",
            "updateTime": "2023-08-01 15:54:21",
            "isDeleted": 0,
            "param": {},
            "roleName": "系统管理员",
            "roleCode": "system",
            "description": "修改测试。。",
            "dataScope": "1",
        },
        {
            "id": "2",
            "createTime": "2021-09-31 08:09:18",
            "updateTime": "2023-08-01 12:54:21",
            "isDeleted": 0,
            "param": {},
            "roleName": "超级管理员",
            "roleCode": "system",
            "description": "修改测试。。",
            "dataScope": "3",
        }
    ];
    return {
        code: 200,
        message: '成功获取所有角色信息',
        data: roles,
      };
});
// 添加角色
Mock.mock('/admin/system/sysRole/save', 'post', () => {
    const newRole = {
        id: "24",
        createTime: "2021-09-31 08:15:29",
        updateTime: "2022-07-15 15:19:18",
        isDeleted: null,
        param: {},
        roleName: "一个角色12",
        roleCode: "benewakeAdmin",
        description: "北醒1",
        dataScope: "1",
    };
    return {
        code: 200,
        message: 'mock添加角色成功',
        data: newRole,
      };
});
// 修改角色信息
Mock.mock('/admin/system/sysRole/update', 'post', () => {
    return {
        code: 200,
        message: 'mock修改用户成功',
        data: null,
      };
});
// 删除单一角色
Mock.mock('/admin/system/sysRole/remove', 'post', () => {
    return {
        code: 200,
        message: 'mock删除角色成功',
        data: null,
      };
});
// 批量删除角色
Mock.mock('/admin/system/sysRole/batchRemove', 'post', () => {
    return {
        code: 200,
        message: 'mock批量删除角色成功',
        data: null,
      };
});
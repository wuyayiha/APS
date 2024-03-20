// mock.js

import Mock from 'mockjs';

// 使用 Mock.js 拦截登录请求
Mock.mock('/system/index/login', 'post', (options) => {
  // 获取请求的数据
  const requestData = JSON.parse(options.body);

  // 假设用户名和密码是正确的
  if (requestData.username === '1' && requestData.password === '1') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: Mock.Random.guid(),
      },
    };
  } else {
    return {
      code: 216,
      message: "账号或密码错误",
      data:null
    };
  }
});

// 使用 Mock.js 拦截获取用户信息的请求
Mock.mock('/system/index/info', 'get', () => {
  // 假设登录后会返回用户信息
  const userInfo = {
    user: "test",
    buttons: [
      "bnt.sysUser.list",
      "bnt.sysUser.add",
      "bnt.sysUser.delete"
    ],
    roles: [
      {
        id: 2,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        param: {},
        roleName: "普通管理员",
        roleCode: "COMMON",
        description: "普通管理员",
        dataScope:4
      }
    ],
    // routers: [
    // {
    //     name:"test4",
    //     path: "/test4",
    //     hidden: "false",
    //     component: "four",
    //     alwaysShow: "true",
    //     meta: {
    //       title:"甘特图"
    //     },
    //     children: [
    //       {
    //         name:"gtt1",
    //         path: '/gtt1',
    //         component: "four",
    //         alwaysShow: "true",
    //         meta: {
    //           title:"工单甘特图"
    //         },
    //       },  
    //     ]
    //   },
    //   {
    //     name:"test1",
    //     path: "/test1",
    //     hidden: "false",
    //     component: "one",
    //     alwaysShow: "true",
    //     meta: {
    //       title:"用户及权限管理"
    //     },
    //     children: [
    //       {
    //         name:"userManage",
    //         path: '/userManage',
    //         component: "system/sysUser/list",
    //         alwaysShow: "true",
    //         meta: {
    //           title:"用户管理"
    //         },
    //       },
    //       {
    //         name:"rolesManage",
    //         path: '/rolesManage',
    //         component: "system/sysRole/list",
    //         alwaysShow: "true",
    //         meta: {
    //           title:"角色管理"
    //         },
    //       },
    //       {
    //         name:"deptManage",
    //         path: '/deptManage',
    //         component: "permission/deptManage",
    //         alwaysShow: "true",
    //         meta: {
    //           title:"部门管理"
    //         },
    //       },
    //       {
    //         name:"viewRolesManage",
    //         path: '/viewRolesManage',
    //         component: "permission/viewRolesManage",
    //         alwaysShow: "true",
    //         meta: {
    //           title:"视图列角色管理"
    //         },
    //       },
    //       {
    //         name:"viewInfoManage",
    //         path: '/viewInfoManage',
    //         component: "permission/viewInfoManage",
    //         alwaysShow: "true",
    //         meta: {
    //           title:"视图列信息管理"
    //         },
    //       },
    //     ]
    //   },
    //   {
    //     name:"test2",
    //     path: "/test2",
    //     hidden: "false",
    //     component: "schedule",
    //     alwaysShow: "true",
    //     meta: {
    //       title:"排程"
    //     }
    //   },
      
    //   {
    //     name:"test3",
    //     path: "/test3",
    //     hidden: "false",
    //     component: "three",
    //     alwaysShow: "true",
    //     meta: {
    //       title:"测试甘特图"
    //     }
    //   }
    // ]
    routers:[]
    
  };

  return {
    code: 200,
    message: '获取用户信息成功',
    data: userInfo,
  };
});

Mock.mock('/system/index/exit', 'post', () => {
    return {
      "code": 200,
      "message": "成功",
      "data": null
    }
})

Mock.mock('/system/sysUser/updatePwdByUser', 'post', () => {
  return {
    "code": 200,
    "message": "成功",
    "data": null
  }
})







// api.js
import axios from 'axios';
import request from '@/utils/request'

export async function login(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/system/index/login',
    method: 'post',
    data:data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/system/index/info',
    method: 'get'
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/system/index/exit',
    method: 'post'
  })
}

//修改自己密码
export function updatePwd(oldPassword,newPassword,reNewPassowrd) {
  const data = {
    oldPassword,
    newPassword,
    reNewPassowrd
  }
  return request({
    url: '/system/sysUser/updatePwdByUser',
    method:'post',
    data:data
  })
}

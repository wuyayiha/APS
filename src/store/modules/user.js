import { login,  getInfo, logout, updatePwd  } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'

const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: getToken(),
      name: '',
      isSchedule:false,
      buttons:[],
      roles: [],
      routers: [],
      pageSize:localStorage.getItem('pageSize') || 100
    }),
    actions: {
      // 登录
      login(username,password) {
        return new Promise((resolve, reject) => {
          login(username, password).then(res => {
            setToken(res.data.token)
            this.token = res.data.token
            // 保存数据到localStorage
            localStorage.setItem('name', username);
            console.log(res)
            resolve()
          }).catch(error => {
            // 处理登录失败，例如显示错误消息
            console.error('登录失败', error);
            reject(error)
          })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
          getInfo().then(res => {
            if (res.data.roles && res.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              this.buttons = res.data.buttons
              this.roles = res.data.roles
              this.routers = res.data.routers
              console.log("获取到routers和roles")
            } else {
              this.roles = ['ROLE_DEFAULT']
              console.log("没有获取到routers和roles")
            }
            // this.name = user.username
            resolve(res)
          }).catch(error => {
            console.log(error,'user代码报错')
            reject(error)
          })
        })
      },
      // 退出系统
      logOut() {
        return new Promise((resolve, reject) => {
          logout().then(() => {
            this.token = ''
            this.roles = []
            this.routers = []
            localStorage.removeItem('name');
            removeToken()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      updatePwd(oldPassword,newPassword,reNewPassowrd) {
        return new Promise((resolve, reject) => {
          updatePwd(oldPassword,newPassword,reNewPassowrd).then((res) => {
            console.log('修改密码成功')
            resolve(res)
          }).catch((error) => {
            console.log('修改密码失败')
            reject(error)
          })
        })
      },
      setSize(newSize) {
        this.pageSize = newSize;
      }
    }
  })

export default useUserStore

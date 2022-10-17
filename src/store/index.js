import Vue from 'vue'
import Vuex from 'vuex'
import tools from '@/js/tools'

Vue.use(Vuex)
const LOCAL_USER_KEY = 'liuguanghui-liuyanban-message'
const SERVER_USER = {
  // 在LOCAL_USER_KEY里面添加用户信息
  saveUser(userinfo) {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userinfo))
  },
  // 更新LOCAL_USER_KEY里面的用户信息
  loadUser() {
    let userinfo = localStorage.getItem(LOCAL_USER_KEY)
    if (userinfo) {
      try {
        return JSON.parse(userinfo)
      } catch (error) {
        return {
          isLogin: false,
          tbUser: {},
          tbUserInfo: {},
          userOtherInfo: {},
        }
      }
    }
    return {
      isLogin: false,
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
    }
  },
  // 登出是移除本地的USER信息
  removeUser() {
    localStorage.removeItem(LOCAL_USER_KEY)
  },
}

export default new Vuex.Store({
  state: {
    loginUser: SERVER_USER.loadUser(),
  },
  getters: {},
  mutations: {
    serUserInfo(state, user) {
      SERVER_USER.saveUser(user)
      state.loginUser = SERVER_USER.loadUser()
    },
    removeUserInfo() {
      localStorage.removeItem(LOCAL_USER_KEY)
    },
  },
  actions: {
    updateUserInfo({ commit }) {
      return new Promise((a, b) => {
        tools.ajax('/user/auth/getUserInfo', {}, (data) => {
          let user = { isLogin: data.success }
          if (data.success) {
            user.tbUser = data.tbUser
            user.tbUserInfo = data.tbUserInfo
            user.userOtherInfo = data.userOtherInfo
            commit('serUserInfo', user)
            a()
          } else {
            commit('removeUserInfo')
            b()
          }
        })
      })
    },
  },
  modules: {},
})

// import storage from 'store'
// import { getAccount } from '@/api/manger'
const user = {
  namespaced: true,
  state: {
    token:null,
    accountInfo:{
      id:0
    }
  },
  mutations: {
    M_SET_TOKEN: (state, token) => {
      state.token = token
    },
    M_SET_USER: (state, info) => {
      state.accountInfo = info
    },
    M_SET_NICKNAME: (state, nickName) => {
      state.accountInfo.nickName = nickName
    },
    M_SET_AVATAR: (state, avatar) => {
      state.accountInfo.avatar = avatar
    },
    M_SET_DESCRIPTION: (state, description) => {
      state.accountInfo.description = description
    },
  },
  actions: {
    A_UPDATE_TOKEN({commit},token){
      commit('M_SET_TOKEN', token)
    },
    A_UPDATE_USER({commit},info){
      commit('M_SET_USER', info)
    },
    A_UPDATE_NICKNAME({commit},playload){
      commit('M_SET_NICKNAME', playload)
    },
    A_UPDATE_AVATAR({commit},playload){
      commit('M_SET_AVATAR', playload)
    },
    A_UPDATE_DESCRIPTION({commit},playload){
      commit('M_SET_DESCRIPTION', playload)
    },
  }
}

export default user
  
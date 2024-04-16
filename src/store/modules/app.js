/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-06-25 00:42:14
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-11 07:52:44
 * @FilePath: \wap\src\store\modules\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import storage from 'store'
// import { getAccount } from '@/api/manger'
const app = {
  namespaced: true,
  state: {
    BaseUrl:"",
    base:{
        title:"",
        theme:"light"
    },
    file:{},
    pay:{},
    // sesonEndTime:"2024/4/03 00:30"
  },
  mutations: {
    M_UPDATE_BASE: (state, base) => {
      state.base = base
    },
    M_UPDATE_FILE: (state, file) => {
        state.file = file
    },
    M_UPDATE_PAY: (state, pay) => {
        state.pay = pay
    },
    M_UPDATE_BASEURL(state,playload){
      state.BaseUrl = playload
    },
  },
  actions: {
    A_UPDATE_BASE({commit},playload){
      commit('M_UPDATE_BASE', playload)
    },
    A_UPDATE_FILE({commit},playload){
      commit('M_UPDATE_FILE', playload)
    },
    A_UPDATE_PAY({commit},playload){
      commit('M_UPDATE_PAY', playload)
    },
    A_UPDATE_BASEURL({commit},playload){
      commit('m_UPDATE_BASEURL', playload)
    },
  }
}

export default app

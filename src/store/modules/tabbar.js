// import storage from 'store'
// import { getAccount } from '@/api/manger'
const tabbar = {
    namespaced: true,
    state: {
      list: [
        {
          "pagePath": "/pages/index/index",
          iconPath: "home",
          selectedIconPath: "home-fill",
          text: '首页',
          name:"home",
          customIcon: false,
        },
        {
          "pagePath": "/pages/feed/index",
          iconPath: "moments",
          selectedIconPath: "moments-circel-fill",
          text: '动态',
          name:"feed",
          customIcon: false,
        },
        {
          "pagePath": "/pages/notice/index",
          iconPath: "chat",
          selectedIconPath: "chat-fill",
          text: '通知',
          count: 23,
          name:"notice",
          customIcon: false,
        },
        {
          "pagePath": "/pages/account/index",
          iconPath: "account",
          selectedIconPath: "account-fill",
          text: '我的',
          name:"account",
          customIcon: false,
        },
      ],
      current: 0,
    },
    mutations: {
      M_SET_CURRENT: (state, current) => {
        state.current = current
      },
      M_SET_NOTICECOUNT: (state, count) => {
        state.list[2].count = count
      },
    },
    actions: {
      A_UPDATE_CURRENT({commit},current){
        commit('M_SET_CURRENT', current)
      },
      A_UPDATE_NOTICECOUNT({commit},count){
        commit('M_SET_NOTICECOUNT', count)
      },
    }
  }
  
  export default tabbar
  
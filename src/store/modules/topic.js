// import storage from 'store'
// import { getAccount } from '@/api/manger'
const topic = {
    namespaced: true,
    state: {
        title:"",
        files:[],
        groupInfo:null,
    },
    mutations: {
      M_SET_TITLE: (state, title) => {
        state.title = title
      },
      M_SET_FILES: (state, files) => {
        state.files = files
      },
      M_SET_GROUPINFO: (state, info) => {
        state.groupInfo = info
      },
    },
    actions: {
      A_UPDATE_TITLE({commit},playload){
        // console.log(token)
        commit('M_SET_TITLE', playload)
      },
      A_UPDATE_FILES({commit},playload){
        // console.log(token)
        commit('M_SET_FILES', playload)
      },
      A_UPDATE_GROUPINFO({commit},playload){
        // console.log(token)
        commit('M_SET_GROUPINFO', playload)
      },
    }
  }
  
  export default topic
    
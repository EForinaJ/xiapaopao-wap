// import storage from 'store'
// import { getAccount } from '@/api/manger'
const notice = {
    namespaced: true,
    state: {
        system: 0,
        comment: 0,
        like: 0,
        follow: 0,
    },
    mutations: {
        M_UPDATE_HAVE_NOTICE: (state, payload) => {
            state.system = payload.system
            state.comment = payload.comment
            state.like = payload.like
            state.follow = payload.follow
        },
    },
    actions: {
        A_UPDATE_HAVE_NOTICE({commit},playload){
            commit('M_UPDATE_HAVE_NOTICE', playload)
        },
    }
}
  
  export default notice
    
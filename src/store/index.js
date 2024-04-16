import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import app from './modules/app'
import user from './modules/user'
import topic from './modules/topic'
import notice from './modules/notice'

export default new Vuex.Store({
  modules: {
    app,
    user,
    topic,
    notice,
  },
  state: {
    
  },
  mutations: {

  },
  actions: {

  }
})

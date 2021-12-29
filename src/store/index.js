import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newFang:{},
    newAddress:'',
    editFang:{},
  },
  mutations: {
    setNewFangInfo(state,data){
      state.newFang  = data;
    },
    setNewAddress(state,data){
      state.newAddress = data;
    },
    resetFangInfo(state){
      state.newFang = null
      state.newAddress = ''
    }
  },
  actions: {
  },
  modules: {
  }
})

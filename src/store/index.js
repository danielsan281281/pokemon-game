import { createStore } from 'vuex'

export default createStore({
  state: {
    aciertos: 0,
    fallos: 0
  },
  mutations: {
    contarAcierto: ( state ) => state.aciertos++,
    contarFallo: ( state ) => state.fallos++,
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getAciertos: ( state ) => state.aciertos,
    getFallos: ( state ) => state.fallos,
  }
})

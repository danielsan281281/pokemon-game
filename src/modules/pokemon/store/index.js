import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import state from './state' 

const pokemonModule = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default pokemonModule
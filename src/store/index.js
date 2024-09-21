import { createStore } from 'vuex'

import pokemon from '@/modules/pokemon/store'
import auth from '@/modules/auth/store'

// Create a new store instance.
const store = createStore({
    modules: {
      auth,
      pokemon
    }
})

export default store
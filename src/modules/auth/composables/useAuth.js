import { computed } from 'vue'
import { useStore } from 'vuex'

const useAuth = () => {
    const store = useStore()

    const createUser = async( user ) => {
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    const loginUser = async( user ) => {
        const resp = await store.dispatch('auth/loginUser', user)
        return resp
    }

    const checkAuthStatus = async() => {
        const resp = await store.dispatch('auth/checkAuthStatus')
        return resp
    }

    const logout = () => {
        store.commit('auth/logoutUser')
        store.commit('pokemon/resetScore')
    }

    return {
        checkAuthStatus,
        createUser,
        loginUser,
        logout,

        authStatus: computed(() => store.getters['auth/currentState']),
        username: computed(() => store.getters['auth/username']),
    }
}

export default useAuth
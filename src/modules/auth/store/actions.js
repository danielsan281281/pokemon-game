import authApi from "@/api/authApi";

// desestructuramos el context y tomamos el commit
export const createUser = async ( { commit }, user ) => {

    const { name, email, password } = user

    try {
        const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        // console.log(data);
        const { idToken, refreshToken } = data

        const { data2 } = await authApi.post(':update', { displayName: name, idToken })
        // console.log(data2);

        delete user.password
        // commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
    } catch (error) {
        console.error(error.response);
        return { ok: false, message: error.response.data.error.message }
    }
}

export const loginUser = async ( { commit }, user ) => {

    const { email, password } = user

    try {
        const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
        // console.log(data);
        const { displayName, idToken, refreshToken } = data

        user.name = displayName

        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
    } catch (error) {
        console.error(error.response);
        return { ok: false, message: error.response.data.error.message }
    }
}

export const checkAuthStatus = async ( { commit } ) => {

     const idToken = localStorage.getItem('idToken')
     const refreshToken = localStorage.getItem('refreshToken')

    if( !idToken ) {
        commit('logoutUser')
        return { ok: false, message: 'No hay token' }
    }

    try {
        const { data } = await authApi.post(':lookup', { idToken })
        // console.log(data);
        const { displayName, email } = data.users[0]

        const user = {
            name: displayName,
            email
        }

        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
    } catch (error) {
        commit('logoutUser')
        console.error(error.response);
        return { ok: false, message: error.response.data.error.message }
    }
}
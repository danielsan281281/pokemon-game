import store from '@/store'

const isAuthenticatedGuard = async( to, from, next ) => {

    const { ok } = await store.dispatch('auth/checkAuthStatus')

    ok? next(): next({ name: 'login' })
}

export default isAuthenticatedGuard
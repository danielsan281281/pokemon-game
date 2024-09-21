// getters: son para traer información del state
// no son asíncronos usualmente
export const currentState = ( state ) => {
    return state.status
}

export const username = ( state ) => {
    return state.user?.name || ''
}
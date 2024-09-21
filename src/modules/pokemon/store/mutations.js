// mutations: Son síncronas e implactan en el state, hacen la modificación de éste. No deberían tener errores como las acciones
export const increaseHits = ( state ) => state.hits++

export const increaseErrors = ( state ) => state.errors++

export const resetScore = ( state ) => {
    state.hits = 0
    state.errors = 0
}
// state: El state es reactivo y cuando se cambie vamos a notificar a todos los componentes que estén escuchando los cambios del state
export default () => ({
    status: 'authenticating', // 'authenticated', 'not-authenticated', 'authenticating'
    user: null,
    idToken: null,
    refreshToken: null
})
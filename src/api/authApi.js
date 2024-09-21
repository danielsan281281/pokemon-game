import axios from "axios"

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        // key: 'AIzaSyBPQh5cT0m-bNm-sd59-nKFFuJWD7VLQW0'
        key: 'AIzaSyD7qFWOfkXkQkXw-FwcpUg4MLbq2ERuVag'
    }
})

export default authApi
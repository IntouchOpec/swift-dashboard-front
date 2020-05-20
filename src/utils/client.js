import axios from 'axios'
import { refeshTokenURL, apiURL } from './endpoint'
// import { store } from './store'
import qs from 'querystring'
import Swal from 'sweetalert2'

let clientRefreshTokenRequest

const getClientRefreshTokenRequest = () => {
    if (!clientRefreshTokenRequest) {
        let refreshToken = window.localStorage.getItem('refreshToken')
        refreshToken = JSON.parse(refreshToken)
        let user = window.localStorage.getItem('user')
        user = JSON.parse(user)
  
        clientRefreshTokenRequest = noRetryClient.post(refeshTokenURL, 
            qs.stringify({
                'username': user.email,
                'refresh_token': refreshToken.refresh_token,
                'grant_type': 'refresh_token',
                'client_id': process.env.client_id,
                'client_secret': process.env.client_secret
            })
            , config)
        clientRefreshTokenRequest.then(resetClientRefreshTokenRequest)
        .catch(err => {  })
    }
    return clientRefreshTokenRequest
}

const resetClientRefreshTokenRequest = () => {
    clientRefreshTokenRequest = null
}

const doErrorResponse = (err) => {
    if (err.response.status === 401) {
        // .dispatch({ type: AUTH_UNAUTHENTICATED })
    } else if (err.response.status >= 500) {
        Swal.fire({
            type: 'error',
            title: 'มีบางอย่างผิดพลาดกรุณาติดต่อผู้ดูแลระบบ',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

const baseConfig = {
    baseURL: apiURL
}
const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

const baseRequest = (config) => {
    // const uuid = uuidV4()
    let accessToken = window.localStorage.getItem('refreshToken')
    accessToken = JSON.parse(accessToken)
    config.headers.Authorization = accessToken ? `Bearer ${accessToken.access_token}` : ''
    // config.requestLoaderId = uuid
    // store.dispatch({
    //     type: GLOBAL_ADD_LOADER,
    //     payload: uuid
    // })
    return config
}

const baseResponse = (response) => {
    // store.dispatch({
    //     type: GLOBAL_REMOVE_LOADER,
    //     payload: response.config.requestLoaderId
    // })
    return response
}

let noRetryClient = axios.create(baseConfig)
noRetryClient.interceptors.request.use(baseRequest)

noRetryClient.interceptors.response.use(baseResponse, error => {
// store.dispatch({
//     type: GLOBAL_REMOVE_LOADER,
//     payload: error.response.config.requestLoaderId
// })
doErrorResponse(error)
    return Promise.reject(error)
})

let client = axios.create(baseConfig)
    client.interceptors.request.use(baseRequest)
    client.interceptors.response.use(baseResponse, error => {
    // store.dispatch({
    //     type: GLOBAL_REMOVE_LOADER,
    //     payload: error.response.config.requestLoaderId
    // })
    // if (error.response.status === 401) {
    //     return getClientRefreshTokenRequest()
    //         .then(response => {
    //             window.localStorage.setItem('accessToken', response.data.access)
    //             error.response.config.headers.Authorization = `Bearer ${response.data.access}`
    //             return noRetryClient(error.response.config)
    //         })
    // } else {
    //     doErrorResponse(error)
    // }
    return Promise.reject(error)
})

export default client

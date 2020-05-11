import {
    AUTH_AUTHENTICATED,
    AUTH_UNAUTHENTICATED,
    AUTH_AUTHENTICATION_ERROR
} from 'utils'
export const initialStateAuth = {
    auth: true,
    projects: [],
    profile: {},
    loading: true
}

export const authReducer = (state, action) => {
    switch (action.type) {
        
        case AUTH_AUTHENTICATED:
            return {
                ...state,...action.payload, auth: true,loading: false
            }
        case AUTH_UNAUTHENTICATED:
            return {...initialStateAuth,loading: false, auth: false,}
    
        default:
            return state
    }
}  
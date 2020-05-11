import authReducer from 'reducers/auth'

export const initialStateAuth = {
    auth: false,
    profile: {},
    projects: [],
    projectDetail: {}
}

export {
    authReducer
}
import authReducer from 'reducers/auth'

export const initialStateAuth = {
    auth: true,
    profile: {},
    projects: [],
    projectDetail: {}
}

export {
    authReducer
}
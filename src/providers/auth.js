import React, { useReducer, useState, useEffect } from 'react'
import { initialStateAuth, authReducer } from 'reducers/auth'
import {AuthContext} from './index'
import { AUTH_AUTHENTICATED, AUTH_UNAUTHENTICATED } from 'utils'
import { refeshTokenURL } from 'utils/endpoint'
import axios from 'axios'
import qs from 'querystring'

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialStateAuth)
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken')
    const token = JSON.parse(refreshToken)
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      axios.post(refeshTokenURL, 
        qs.stringify({
            'username': user.email,
            'refresh_token': token.refresh_token,
            'grant_type': 'refresh_token',
            'client_id': process.env.client_id,
            'client_secret': process.env.client_secret
        })
        , config).then(res => {
          window.localStorage.setItem('user', JSON.stringify(res.data))
          window.localStorage.setItem('refreshToken', JSON.stringify(res.data.token))
          dispatch({type: AUTH_AUTHENTICATED,payload: res.data})
        }).catch(err => {
          dispatch({ type: AUTH_UNAUTHENTICATED })
        })
      } else {
        dispatch({ type: AUTH_UNAUTHENTICATED })
      }
    }, [])
  return (
    <AuthContext.Provider
      value={{
        dispatch: dispatch,
        auth: state
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

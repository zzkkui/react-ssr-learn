import { CHANGE_LOGIN } from './contants'

const changeLogin = (value) => ({
  type: CHANGE_LOGIN,
  value
})

export const handleLogin = () => {
  return (dispatch, getState, aixosInstance) => {
    return aixosInstance.get('/api/login.json?secret=U2FsdGVkX1')
      .then((res) => {
        // console.log(res)
        dispatch(changeLogin(true))
      }).catch(err => console.log(err))
  }
}

export const handleLogout = () => {
  return (dispatch, getState, aixosInstance) => {
    return aixosInstance.get('/api/logout.json?secret=U2FsdGVkX1')
      .then((res) => {
        // console.log(res)
        dispatch(changeLogin(false))
      }).catch(err => console.log(err))
  }
}

export const getHeaderInfo = () => {
  return (dispatch, getState, aixosInstance) => {
    return aixosInstance.get('/api/isLogin.json?secret=U2FsdGVkX1')
      .then((res) => {
        // console.log(res)
        dispatch(changeLogin(false))
      }).catch(err => console.log(err))
  }
}
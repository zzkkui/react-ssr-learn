
import { CHANGE_LOGIN } from './contants'

const defaultState = {
  login: true,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      // console.log(action.value)
      return {
        ...state,
        login: action.value
      } 
    default: 
      return state;
  }
}
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import clientAxios  from '../client/request'
import serverAxios  from '../server/request'

import { reducer as homeReducer } from '../containers/Home/store';
import { reducer as headerReducer } from '../components/Header/store';

const reducer = combineReducers({
  home: homeReducer,
  header: headerReducer
})

//动态生成store 避免不同用户相同store
export const getStore = (req) => {
  //改变服务器端store内容，一定要用serverAxios
  return createStore(reducer, applyMiddleware(
    thunk.withExtraArgument(serverAxios(req))
  ));
}

export const getClientStore = () => {
  //改变客户端store内容，一定要用clientAxios
  const defalutState = window.context.state;
  return createStore(reducer, defalutState, applyMiddleware(
    thunk.withExtraArgument(clientAxios)
  ));
}

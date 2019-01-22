
import { CHANGE_LIST } from './contants'

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = () => {
  // http://47.95.113.63/ssr/api/news.json?secret=U2FsdGVkX1

  // 浏览器运行
  // /api/news.json = localhost:3000/api/news.json
  // 服务器运行
  // /api/news.json = 服务器跟目录下 /api/news.json

  return (dispatch, getState, aixosInstance) => {
    return aixosInstance.get('/api/news.json?secret=U2FsdGVkX1')
      .then((res) => {
        // console.log(res)
        const list = [{
          id: 1, text: 'aaaa'
        }, {
          id: 2, text: 'bbbb'
        }]
        dispatch(changeList(list))
      }).catch(err => console.log(err))
  }
}
import express from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from "react-router-config";

import { getStore } from '../store';
import routes from '../routes';
import { render } from './utils';
import { rejects } from 'assert';


// 客户端渲染
// react代码在浏览器中执行，消耗用户浏览器性能

// 服务器端渲染
// react代码在服务器执行，消耗服务器端的性能

const app = express();
app.use(express.static('public'));

app.use('/api', proxy('http://47.95.113.63', {
  proxyReqPathResolver: function (req) {
    // console.log(req.url);
    return '/ssr/api' + req.url
  }
}));

app.get('*', (req, res) => {
  // console.log(req)
  const store = getStore(req)
  //根据用户的访问路径来判断需要拿哪个组件的异步数据
  const matchedRoutes = matchRoutes(routes, req.path)
  // console.log(matchedRoutes)
  const promises = [];

  // 让matchRoutes里面所有的组件，对应的loadData方法执行一次
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      // Promise 理解强化！！
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  })

  Promise.all(promises).then(() => {
    const context = {
      css: []
    }
    const html = render(store, routes, req, context)
    if(context.action === 'REPLACE')  {
      res.redirect(301, context.url)
    }else if(context.NOT_FOUND) {
      res.status(404)
    }
    // console.log(context)
    res.send(html)
  })

});

app.listen(3000);
console.log(`http://localhost:3000`);
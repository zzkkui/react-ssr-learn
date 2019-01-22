
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from "react-helmet";


//renderToString 事件等不会被渲染
//<div id="root">${content}</div> 里面不能有空格

export const render = (store, routes, req, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <Switch>
          {
            renderRoutes(routes)
          }
        </Switch>
      </StaticRouter>
    </Provider>
  );
  const helmet = Helmet.renderStatic();
  
  const cssStr = context.css.length && context.css.join('\n')

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <style>${cssStr}</style>
      </head>
      <body>
        <div id="root">${content}</div>  
        <script>
          window.context = {
            state: ${JSON.stringify(store.getState())}
          }
        </script>   
        <script src='./index.js'></script>
      </body>
    </html>
  `
}
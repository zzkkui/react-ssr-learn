import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import { Provider } from 'react-redux';

import { getClientStore } from '../store';

const store = getClientStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {
            renderRoutes(routes)
          }
        </Switch>        
      </BrowserRouter>
    </Provider>   
  )
}

const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate

renderMethod(<App />, document.getElementById('root'));

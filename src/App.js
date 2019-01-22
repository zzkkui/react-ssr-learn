import React from 'react';
import { renderRoutes } from 'react-router-config';

import withStyle from './withStyle'
import styles from './App.css'
import { actions } from './components/Header/store/';
import Header from './components/Header/'

class App extends React.Component {

  render() {
    return (
      <div>
        <Header staticContext={this.props.staticContext}/>
        {
          renderRoutes(this.props.route.routes)
        }
      </div>
    )
  }
  
};

//App组建需要的数据，只要再服务端渲染就好了，因为每个组件都是App的子组件
const ExportApp = withStyle(App, styles)
ExportApp.loadData = (store) => {
  return store.dispatch(actions.getHeaderInfo())
}

export default ExportApp;

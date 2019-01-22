import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

import { getHomeList } from './store/actions';
import withStyle from '../../withStyle'
import styles from './style.css'

//同构：一套React代码，在服务器端执行一次， 在客户端再执行一次

class Home extends React.Component {

  //在服务器端不会执行
  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getHomeList()
    }
  }

  getList = () => {
    const { list } = this.props;
    return list.map(item => <div key={item.id}>{item.text}</div>)
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>zzkkui SSR 首页</title>
          <meta name="description" content="zzkkui SSR 首页" />
        </Helmet>
        <div className={styles.test}>hello {this.props.name}</div>
        {
          this.getList()
        }
        <button onClick={() => { alert('click') }}>click</button>
      </div>
    )
  }

};

const mapStateToProps = state => ({
  list: state.home.newList,
  name: state.home.name
})

const mapDispathToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})

const ExportHome = connect(mapStateToProps, mapDispathToProps)(withStyle(Home, styles))
ExportHome.loadData = (store) => {
  //这个方法，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
  return store.dispatch(getHomeList())
}

export default ExportHome;

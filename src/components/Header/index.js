import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { actions } from './store'
import withStyle from '../../withStyle'
import styles from './style.css'

class Header extends React.Component {

  render() {
    const { login, handleLogin, handleLogout, handleTransfrom } = this.props
    return (
      <div>
        <Link to='/' className={styles.test}>首页</Link>
        <br/>
        {
          login ? 
          <React.Fragment>
            <button onClick={handleLogout}>退出</button>
            <br />
            <button onClick={handleTransfrom}>翻译</button>
          </React.Fragment> : 
          <button onClick={handleLogin}>登陆</button>
        }
      </div>
    ) 
  } 
};

const mapState = (state) => ({
  login: state.header.login
})

const mapDispatch = (dispatch) => ({
  handleLogin() {
    dispatch(actions.handleLogin())
  },
  handleLogout() {
    dispatch(actions.handleLogout())
  },
  handleTransfrom() {
    console.log('翻译')
  }
})

export default connect(mapState, mapDispatch)(withStyle(Header, styles));

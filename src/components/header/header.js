import { useEffect } from "react";
import { Menu, Layout } from 'antd';
import {
  Link
} from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsernameByToken, updateToken } from '../../reducers/profile'
const { Header } = Layout;
const AppHeader = () => {
  const token = useSelector(state => state.profile.token)
  const username = useSelector(state => state.profile.username)
  const error = useSelector(state => state.profile.error)
  const dispatch = useDispatch()
  useEffect(() => {
    if (token !== null) {
      dispatch(fetchUsernameByToken(token))
    }
  }, [token, dispatch])

  useEffect(() => {
    if ( error ) {
      window.localStorage.removeItem('spotify_token');
      dispatch(updateToken( null ))
    }
  }, [error, dispatch])

  return (
  <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/build">Build</Link></Menu.Item>     
      {username ? <Menu.Item key="3"><UserOutlined /> {username}</Menu.Item> : null}
    </Menu>
    
  </Header>
  )
}
export default AppHeader;
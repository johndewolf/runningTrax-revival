import { useEffect, useState } from "react";
import { Menu, Layout } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { UserOutlined, BarChartOutlined, LineChartOutlined, HomeOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsernameByToken, updateToken, signOut } from '../../reducers/profile'
const { Header } = Layout;
const { SubMenu } = Menu;

const AppHeader = () => {
  const location = useLocation();
  const [currentPath, updateCurrentPath] = useState('/')
  const token = useSelector(state => state.profile.token)
  const username = useSelector(state => state.profile.username)
  const playlist = useSelector(state => state.playlist.playlist)
  const error = useSelector(state => state.profile.error)
  const dispatch = useDispatch()
  useEffect(() => {
    if (token !== null) {
      dispatch(fetchUsernameByToken(token))
    }
  }, [token, dispatch])

  useEffect(() => {
    updateCurrentPath(location.pathname)
  }, [location])

  useEffect(() => {
    if ( error ) {
      window.localStorage.removeItem('spotify_token');
      dispatch(updateToken( null ))
    }
  }, [error, dispatch])
  function handleSignout() {
    dispatch(signOut());
    window.localStorage.removeItem('spotify_token');
  }
  return (
  <Header style={{padding: 0}}>
    <div className="logo" />
    <Menu theme="dark" mode="inline" selectedKeys={currentPath}>
      <Menu.Item key="/" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
      <Menu.Item key="/build" icon={<BarChartOutlined />}><Link to="/build">Build</Link></Menu.Item>     
      {playlist.length > 0 ?
        <Menu.Item key="/result" icon={<LineChartOutlined />}><Link to="/result">Playlist</Link></Menu.Item>     
      : null}
      {username ?
        <SubMenu key="3" icon={<UserOutlined />} title={username}>
          <Menu.Item key={1} onClick={handleSignout}>Sign Out</Menu.Item>
        </SubMenu>
      : null}
    </Menu>
  </Header>
  )
}
export default AppHeader;
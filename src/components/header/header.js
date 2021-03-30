import { useContext, useEffect } from "react";
import { Menu, Layout } from 'antd';
import {
  Link
} from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { Context } from '../../components/store'
import { getProfileName } from '../../api/spotify'
import { useSelector, useDispatch } from 'react-redux'
import { addUserName } from '../../slices/profile'
const { Header } = Layout;
const AppHeader = () => {
  const [state, dispatch] = useContext(Context);
  const username = useSelector(state => state.profile.username)
  const reduxDispatch = useDispatch()
  useEffect(() => {
    if (state.token) {
      console.log('sending username request');
      getProfileName(state.token)
        .then(response => {
          reduxDispatch(addUserName(response.data.display_name));
        })
        .catch(error => {
          console.log(error);
          dispatch({type: 'ADD_TOKEN', payload: null});
          window.localStorage.removeItem('spotify_token');
        })
    }
  }, [state.token])
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
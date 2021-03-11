import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Layout,
  Menu
} from "antd";

import './App.css';
import Home from './routes/home/home'
import Build from './routes/build/build'
function App() {
  const { Header, Content } = Layout;
  return (
    <Router>
      <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/build">Build</Link></Menu.Item>
      </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Switch>
          <Route path="/build">
            <Build />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      </Content>
    </Layout>
  </Router>
  );
}

export default App;

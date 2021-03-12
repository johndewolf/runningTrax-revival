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
import Store from './components/store'
import Home from './routes/home/home'
import Build from './routes/build/build'
import './App.css';
const { Header, Content } = Layout;
const App = () => {
  
  return (
    <Store>
        <Router>
          <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/build">Build</Link></Menu.Item>
          </Menu>
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Switch>
              <Route path="/build" component={Build} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
          </Content>
        </Layout>
      </Router>
  </Store>
  );
}

export default App;

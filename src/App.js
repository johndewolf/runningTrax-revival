import { React, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  Layout
} from "antd";
import AppHeader from './components/header/header'
import Home from './routes/home/home'
import Build from './routes/build/build'
import Result from './routes/result/result'
import './App.css';

const { Content, Sider } = Layout;
const App = () => {
  const [sideBarCollapse, updateSideBarCollapsed] = useState(false)
  return (
  <Router>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      collapsible
      collapsed={sideBarCollapse}
      onCollapse={() => updateSideBarCollapsed(!sideBarCollapse)}
    >
      <AppHeader />
    </Sider>
    <Layout>
    
    <Content className="site-layout" style={{ marginLeft: sideBarCollapse ? '80px' : '200px', padding: '0 50px', minHeight:  '100vh' }}>
      <div className="site-layout-background" style={{ padding: 24 }}>
        <Switch>
          <Route path="/build" component={Build} />
          <Route path="/result" component={Result} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Content>
    </Layout>
  </Router>
  );
}

export default App;

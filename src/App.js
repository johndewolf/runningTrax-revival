import { React } from "react";

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
const { Content } = Layout;
const App = () => {

  return (
  <Router>
    <Layout>
    <AppHeader />
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, height:  'calc(100vh - 64px)' }}>
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

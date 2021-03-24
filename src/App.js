import { React } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  Layout
} from "antd";
import Store from './components/store'
import AppHeader from './components/header/header'
import Home from './routes/home/home'
import Build from './routes/build/build'
import Result from './routes/result/result'
import './App.css';
const { Content } = Layout;
const App = () => {

  return (
    <Store>
        <Router>
          <Layout>
          <AppHeader />
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, marginBottom: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Switch>
              <Route path="/build" component={Build} />
              <Route path="/result" component={Result} />
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

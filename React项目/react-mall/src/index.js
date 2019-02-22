import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App';
import IconFont from './iconfont/font';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
// import Home from './components/Content/Content';
import Person from './components/Content/Person/Clerk/Clerk';
import './index.css';

const history = createBrowserHistory()
let { Content } = Layout;

if (module.hot) {
  module.hot.accept();
}

class MallProject extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentWillMount() {
    console.log(history)
  }

  render() {
    console.log(1111)

    return (
      <Router>
        <Fragment >
          <Layout style={{ height: "100%" }}>
            <Sidebar
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            />
            <Layout
              style={{ background: 'rgb(240, 242, 245)', position: 'relative' }}>
              <Header
                toggle={this.toggle}
                collapsed={this.state.collapsed}
              >
              </Header>
              <App />
            </Layout>
          </Layout>
        </Fragment >
      </Router>


    );
  }
}

ReactDOM.render(<MallProject />, document.getElementById('container'));









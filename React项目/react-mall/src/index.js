import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { BrowserRouter as Router,withRouter} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Route from './Route';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
// import Home from './components/Content/Content';
import './index.css';

const history = createBrowserHistory();
 
if (module.hot) {
  module.hot.accept();
};
 class MallProject extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
    };
  }
  
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
       return (
      <Router >
        <Fragment >
          <Layout style={{ height: "100%" }}>
            <Sidebar
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              props
            />
            <Layout
              style={{ background: 'rgb(240, 242, 245)', position: 'relative' }}>
              <Header
                toggle={this.toggle}
                collapsed={this.state.collapsed}
              >
              </Header>
                <Route history/>
            </Layout>
          </Layout>
        </Fragment >
      </Router>
    );
  }
}

ReactDOM.render(<MallProject/> , document.getElementById('container'));









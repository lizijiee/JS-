import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import App from './App';
import IconFont from './iconfont/font';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Content from './components/Content/Content'
import './index.css';


if(module.hot)
{
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

  render() {
    return (
      <Layout style={{border:" 1px solid rgb(230, 230, 230)"}}>
       <Sidebar 
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
       />
    <Layout  style={{ background: 'rgb(240, 242, 245)'}}>
          <Header 
          toggle={this.toggle}
          collapsed={this.state.collapsed}
          >
          </Header>
          <Content style={{height:"1290px"}}/>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<MallProject />, document.getElementById('container'));








          
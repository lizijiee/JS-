import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import { BrowserRouter as Router} from 'react-router-dom'
import Route from './Route';

import { Layout } from 'antd';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import './index.css';
//redux 部分
import {applyMiddleware,createStore} from 'redux';

import {composeWithDevTools } from 'redux-devtools-extension'
//npm install redux-devtools-extension --save-dev



import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {reducer} from './redux/reducers'
// import {couter} from './reducers.js'   //导入函数
// import DevTools from './redux/DevTools/DevTools';



if (module.hot) {//跟新时候页面不刷新,不闪烁;
  module.hot.accept();
};

// redux布局部分;
const middleware = [ thunk ];

const store = createStore(
  reducer,
  // composeWithDevTools()
  composeWithDevTools( //redux 浏览器工具
    applyMiddleware(...middleware)
  )
)

class MallProject extends React.Component {
  constructor(){
    super()
    this.state = {
      collapsed: false,
    };
}
  toggle = () => {  //控制折叠
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
       return (
        <Provider store={store}>
      <Router >
        <Fragment > {/* 临时框,页面结构不显示 */}
          <Layout style={{ height: "100%" }}>{/* 布局组件 */}
            <Sidebar 
              trigger={null}
              collapsible
              collapsed={this.state.collapsed} //控制折叠
              props
            />  {/* 左侧菜单栏 */}
            <Layout
              style={{ background: 'rgb(240, 242, 245)', position: 'relative' }}>
              <Header
                toggle={this.toggle}
                collapsed={this.state.collapsed}
              >{/* 头部菜单栏 */}
              </Header>
                <Route /> {/* 路由组件 => 里面为主内容页 */}
            </Layout>
          </Layout>
          {/* <DevTools /> */}
        </Fragment >
      </Router>
      </Provider> 
    );
  }
}

ReactDOM.render( <MallProject/>, document.getElementById('container'));









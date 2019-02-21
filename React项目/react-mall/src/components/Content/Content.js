import React, { Component } from 'react';
import { Layout, Menu, Icon} from 'antd';
import IconFont from '../../iconfont/font';
// ------Content内组件引入----
import Home from './Home/Home.js';
let { Content} = Layout;
const SubMenu = Menu.SubMenu;

export default class Temp extends Component {
  constructor(){
    super()
   }
  render() {
    return (
        <Content 
        style={{padding: 20, background: '#fff', minHeight: 280,margin: "20px 0 0 16px"
      }}
        >
         <Home/>

        </Content>
    )
  }
}

 
 


import React, { Component } from 'react';
import { Layout, Menu, Icon} from 'antd';
import IconFont from '../../iconfont/font';
import App from '../../' 
let { Content} = Layout;
const SubMenu = Menu.SubMenu;

export default class SS extends Component {
  constructor(){
    super()
   }
  render() {
    console.log(1111)
    return (
        <Content 
        style={{padding: 20, background: '#fff', minHeight: 280,margin: "24px 0 0 16px"
      }}
        >
        </Content>
    )
  }
}

 
 


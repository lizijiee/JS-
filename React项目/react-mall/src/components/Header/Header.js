import React, { Component } from 'react';
import { Layout, Menu, Icon} from 'antd';
import IconFont from '../../iconfont/font';
import '../../index.css' 

let { Header} = Layout;
const SubMenu = Menu.SubMenu;

export default class D extends Component {
  constructor(){
    super()
   }
  render() {
     return (
      <Header style={{ background: '#fff', padding: 0,height: "60px",border:'1px solid #e6e6e6',marginLeft:"16px"}}
          className='border-bottom'
          >
            <Icon
              className="trigger"
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.toggle}
              style={{lineHeight:"60px",fontSize:"20px"}}
            />
            面包屑位置
     </Header>
    )
  }
}

 
 


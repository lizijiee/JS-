import React, { Component } from 'react';
import { Layout, Menu, Icon} from 'antd';
import IconFont from '../../iconfont/font';
import '../../index.css';

let { Sider} = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderBar extends Component {
   render() {
    return (
         <Sider 
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
         style={{background:"white"}}>
        <div className="logo"> 
        <IconFont type='mall-logo-cat' style={{fontSize:'40px',float: "left",margin:"0 25px 0  5px"}}/>
         <IconFont type="mall-logo-github" style={{fontSize:'50px',marginTop:"-4px",float: "left"}}/>
        </div>
        {/* 首页内容 */}
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Icon type="home"  />
           <span>首页</span>
         </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="team" /><span>人员管理</span></span>}
          >
            <Menu.Item key="2"><Icon type="user" /><span>店员列表 </span></Menu.Item>
            <Menu.Item key="3"><Icon type="crown" /><span>会员列表</span></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span>  <IconFont type="mall-food-manage"/><span>菜品管理</span></span>}
          >
            <Menu.Item key="4">

            <IconFont type="mall-food-list" />
             <span>菜品列表</span></Menu.Item>
            <Menu.Item key="5"> <IconFont type="mall-food-add" style={{ fontSize: '14px',color:"rgba(0 0 0 0.65)" }} /><span>菜品添加</span></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={<span><IconFont type="mall-order-manage"/><span>订单管理</span></span>}
          >
            <Menu.Item key="6"><IconFont type="mall-order-list"/><span>订单列表</span></Menu.Item>
            <Menu.Item key="7"><IconFont type="mall-order-deal"/><span>订单处理</span></Menu.Item>
            <Menu.Item key="8"><IconFont type="mall-order-set"/><span>订单原因设置</span></Menu.Item>
          </SubMenu>
          <SubMenu 
          key="sub4"
          title={<span><IconFont type="mall-sale-manage" /><span>营销管理</span></span>}>
           <Menu.Item key="9" ><IconFont type="mall-sale-home" /><span>首页宣传</span></Menu.Item>
           <Menu.Item key="10" ><IconFont type="mall-sale-new" /><span>新品推荐</span></Menu.Item>
           <Menu.Item key="11" ><IconFont type="mall-sale-hot" /><span>热销推荐</span></Menu.Item>
           <Menu.Item key="12" ><IconFont type="mall-sale-deal" /><span>优惠推荐</span></Menu.Item>
           <Menu.Item key="13" ><IconFont type="mall-sale-taocan" /><span>套餐推荐</span></Menu.Item>
           </SubMenu>
            {/* 项目地址及链接 */}
          <Menu.Item key="14">
            <IconFont type="mall-logo" />
            <span>项目地址</span>
          </Menu.Item>
        </Menu>
      </Sider> 
     )
  }
}




  
 
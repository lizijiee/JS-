import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import IconFont from '../../iconfont/font';
import '../../index.css';
import { Link, BrowserRouter } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import PropTypes from 'prop-types';


// import { url } from 'inspector';

let { Sider } = Layout;
const SubMenu = Menu.SubMenu;
 
class SiderBar extends Component {
      constructor(){
            super()
            this.state={
                 selectedKeys:""
            }
       }
      componentWillUpdate() {
            //在这里去监听URL变化
            this.state.selectedKeys=window.location.pathname;
      }
      render() {
            return (
                  <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.props.collapsed}
                        style={{ background: "white" }}>
                        <div className="logo">
                              <IconFont
                                    type='mall-logo-cat'
                                    style={{ fontSize: '40px', float: "left", margin: "0 25px 0  5px" }}
                              />
                              <IconFont
                                    type="mall-logo-github"
                                    style={{ fontSize: '50px', marginTop: "-4px", float: "left" }} />
                        </div>
                        {/* 首页内容 */}
                        <Menu 
                        theme="light" 
                        //defaultSelectedKeys={['/']}和 selectedKeys冲突
                        mode="inline"
                        selectedKeys={[this.state.selectedKeys]}
                        >
                              <Menu.Item key="/" >
                                    <Link to="/">
                                          <Icon type="home" />
                                          <span>首页</span>
                                    </Link>
                              </Menu.Item>
                              <SubMenu
                                    key="sub1"
                                    title={
                                          <span>
                                                <Icon type="team" />
                                                <span>人员管理</span>
                                          </span>
                                    }>
                                    <Menu.Item key="/pers/clerks">
                                          <Link to="/pers/clerks">
                                                <Icon type="user" />
                                                <span>店员列表</span>
                                          </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/pers/member">
                                          <Link to="/pers/member">
                                                <Icon type="crown" />
                                                <span>会员列表</span>
                                          </Link>
                                    </Menu.Item>
                              </SubMenu>
                              <SubMenu
                                    key="sub2"
                                    title={
                                          <span>
                                                <IconFont type="mall-food-manage" />
                                                <span>菜品管理</span>
                                          </span>}>
                                    <Menu.Item key="/food/list">
                                          <Link to="/food/list">
                                                <IconFont type="mall-food-list" />
                                                <span>菜品列表</span>
                                          </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/food/add">
                                          <Link to="/food/add">
                                                <IconFont type="mall-food-add" style={{ fontSize: '14px', color: "rgba(0 0 0 0.65)" }} />
                                                <span>菜品添加</span>
                                          </Link>
                                    </Menu.Item>
                              </SubMenu>
                              <SubMenu
                                    key="sub3"
                                    title={
                                          <span>
                                                <IconFont type="mall-order-manage" />
                                                <span>订单管理</span>
                                          </span>}
                              >
                                    <Menu.Item key="/orders/list">
                                          <Link to="/orders/list">
                                                <IconFont type="mall-order-list" />
                                                <span>订单列表</span>
                                          </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/orders/handle">
                                          <Link to="/orders/handle">
                                                <IconFont type="mall-order-deal" />
                                                <span>订单处理</span>
                                          </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/orders/cause">
                                          <Link to="/orders/cause">
                                                <IconFont type="mall-order-set" />
                                                <span>订单原因设置</span>
                                          </Link>
                                    </Menu.Item>
                              </SubMenu>
                              <SubMenu
                                    key="sub4"
                                    title={
                                          <span>
                                                <IconFont type="mall-sale-manage" />
                                                <span>营销管理</span>
                                          </span>}>
                                    <Menu.Item key="/sale/home" >
                                          <Link to="/sale/home">
                                                <IconFont type="mall-sale-home" />
                                                <span>首页宣传</span>
                                          </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/sale/new" >
                                          <Link to="/sale/new">
                                                <IconFont type="mall-sale-new" />
                                                <span>新品推荐</span>
                                          </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/sale/hot" >
                                          <Link to="/sale/hot">
                                                <IconFont type="mall-sale-hot" />
                                                <span>热销推荐</span>
                                          </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/sale/deals" >
                                          <Link to="/sale/deals">
                                                <IconFont type="mall-sale-deal" />
                                                <span>优惠推荐</span>
                                          </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/sale/combo" >
                                          <Link to="/sale/combo">
                                                <IconFont type="mall-sale-taocan" />
                                                <span>套餐推荐</span>
                                          </Link>
                                    </Menu.Item>
                              </SubMenu>
                              {/* 项目地址及链接 */}
                              <Menu.Item key="/address">
                                    <Link to="/address">
                                          <IconFont type="mall-logo" />
                                          <span>项目地址</span>
                                    </Link>
                              </Menu.Item>
                        </Menu>
                  </Sider>
            )
      }
}
//如果contextTypes没有定义，那么context将会是个空对象。
// SiderBar.contextTypes = {
//       color: PropTypes.string
// };
export default SiderBar



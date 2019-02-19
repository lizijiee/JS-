import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import App from './App';
import IconFont from './iconfont/font';

if(module.hot)
{
    module.hot.accept();
}

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_1050856_g3xhywuvbnb.js',   //阿里巴巴图标引用地址
// });



class SiderDemo extends React.Component {
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
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          {/* 首页 */}
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" >
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
              title={<span><Icon type="antion-food-list" /><span>订单管理</span></span>}
            >
              <Menu.Item key="6"><span>订单列表</span></Menu.Item>
              <Menu.Item key="7"><span>订单处理</span></Menu.Item>
              <Menu.Item key="8"><span>订单原因设置</span></Menu.Item>
            </SubMenu>
            <SubMenu 
            key="sub4"
            title={<span><Icon type="team" /><span>营销管理</span></span>}>
             <Menu.Item key="9" ><Icon type="user" /><span>首页宣传</span></Menu.Item>
             <Menu.Item key="10" ><Icon type="user" /><span>新品推荐</span></Menu.Item>
             <Menu.Item key="11" ><Icon type="user" /><span>热销推荐</span></Menu.Item>
             <Menu.Item key="12" ><Icon type="user" /><span>优惠推荐</span></Menu.Item>
             <Menu.Item key="13" ><Icon type="user" /><span>套餐推荐</span></Menu.Item>
             </SubMenu>
              {/* 项目地址及链接 */}
            <Menu.Item key="24">
              <Icon type="file" />
              <span>项目地址</span>
            </Menu.Item>
          </Menu>

        </Sider>
        <Layout  style={{ background: '#fff'}}>
          <Header style={{ background: '#fff', padding: 0,height: 50,border:'1px solid #e6e6e6'}}
          className='border-bottom'
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{padding: 20, background: '#fff', minHeight: 280,
        margin:" 40px 120px 0 120px"  
        }}
          >
          <App/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<SiderDemo />, document.getElementById('container'));








          
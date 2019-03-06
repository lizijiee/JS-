import React, { Component } from 'react';
import { Layout, Icon, Breadcrumb, Switch } from 'antd';
import { Link } from 'react-router-dom'
import '../../index.css'
import PropTypes from "prop-types";
let { Header } = Layout;

const breadcrumbNameMap = {
  "/": "首页",
  '/pers': '人员',
  "/pers/clerks": "店员列表",
  "/pers/clerksDetails":"店员列表",
  "/pers/member": "会员列表",
  "/food": "菜品",
  "/food/list": "菜品列表",
  "/food/add": "菜品添加",
  "/orders": "订单",
  "/orders/list": "订单列表",
  "/orders/handle": "订单处理",
  "/orders/cause": "订单原因设置",
  "/sale": "营销",
  "/sale/home": "首页宣传",
  "/sale/new": "新品推荐",
  "/sale/hot": "热销推荐",
  "/sale/deals": "首页宣传",
  "/sale/combo": "套餐推荐",
  "/address": "项目地址"
};
export default class D extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pathSnippets: null,
      extraBreadcrumbItems: null
    }
  };
  static contextTypes = {
    router: PropTypes.object
  }
  getPath() {
     //对路径进行切分，存放到this.state.pathSnippets中
     let pathname = this.context.router.history.location.pathname
     this.state.pathSnippets = pathname.split('/').filter(i => i);//["pers", "clerks"]
      if(pathname=="/"||pathname=="/address"){
        this.state.extraBreadcrumbItems= 
        <Breadcrumb.Item key={pathname}>
        <Link to={pathname}>
          {breadcrumbNameMap[pathname]}
        </Link>
      </Breadcrumb.Item>
     }else{
      // this.state.pathSnippets.unshift("/")//改变原来数组
       this.state.extraBreadcrumbItems = this.state.pathSnippets.map((_, index) => {
        const url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`; 
        if(this.state.pathSnippets.length!=(index+1)){
          return (
            <Breadcrumb.Item key={url}>
              <Link to={url}   style={{color:"black",fontWeight:600}}>
               {breadcrumbNameMap[url]}
              </Link>
            </Breadcrumb.Item>
          );
        }else{
          return (
            <Breadcrumb.Item key={url}>
              <Link to={url} >
               {breadcrumbNameMap[url]}
              </Link>
            </Breadcrumb.Item>
          );
        }
         
      });
      this.state.extraBreadcrumbItems = [(
        <Breadcrumb.Item key="home">
          <Link to="/" style={{color:"black",fontWeight:600}}>首页</Link>
        </Breadcrumb.Item>
      )].concat( this.state.extraBreadcrumbItems);

     }
     
    

    //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems

  }
  componentWillMount() {
    //首次加载的时候调用，形成面包屑
    this.getPath();
  }
  componentWillReceiveProps() {
    //任何子页面发生改变，均可调用，完成路径切分以及形成面包屑
    // console.log(this.getPath())
    this.getPath();
  }
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0, height: "60px", border: '1px solid #e6e6e6', marginLeft: "16px" }}
        className='border-bottom'
      >
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
          style={{ lineHeight: "60px", fontSize: "20px",marginTop:2,color:"#303133!important" }}
        />
       
          <Breadcrumb style={{verticalAlign:"middle",lineHeight:"60px",marginBottom:5,}}>
            {this.state.extraBreadcrumbItems}
          </Breadcrumb>
         
      </Header>
    )
  }
}





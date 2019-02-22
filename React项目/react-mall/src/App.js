import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Home from './components/Content/Content';
import Clerk from './components/Content/Person/Clerk' 

// 路由表

class App extends Component {
  render() {
    return (
        <Switch>
              <Route 
                  path="/" 
                  exact
                  component={Home}/> 
              <Route 
                  path="/pers/clerks" 
                  render={() => Clerk} /> 
              <Route 
                  path="/pers/member" 
                  render={() => <h3>会员列表</h3>}/> 
              <Route 
                  path="/food/list" 
                  render={() => <h3>菜品列表</h3>}/> 
              <Route 
                  path="/food/add" 
                  render={() => <h3>菜品添加</h3>}/> 
              <Route 
                  path="/orders/list" 
                  render={() => <h3>订单列表</h3>}/> 
              <Route 
                  path="/orders/handle" 
                  render={() => <h3>订单处理</h3>}/> 
              <Route 
                  path="/orders/cause" 
                  render={() => <h3>订单原因设置</h3>}/> 
              <Route 
                  path="/sale/home" 
                  render={() => <h3>首页宣传</h3>}/> 
              <Route 
                  path="/sale/new" 
                  render={() => <h3>新品推荐</h3>}/> 
              <Route 
                  path="/sale/hot" 
                  render={() => <h3>热销推荐</h3>}/> 
              <Route 
                  path="/sale/deals" 
                  render={() => <h3>优惠推荐</h3>}/> 
              <Route 
                  path="/sale/combo" 
                  render={() => <h3>套餐推荐</h3>}/> 
              <Route 
                  path="/address" 
                  render={() => <h3>项目地址</h3>}/> 

        </Switch>
    );
  }
}

export default App;




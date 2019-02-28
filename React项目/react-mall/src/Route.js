import React, { Component } from 'react';
import './App.css';
import {Route ,Switch } from 'react-router-dom'
import Home from './components/Content/Content';
import Clerk from './components/Content/Person/Clerk/Clerk'
import Member from './components/Content/Person/Member/Member'
import FoodList from './components/Content/Food/List/List'
import Add from './components/Content/Food/Add/Add'
import OrderList from './components/Content/Order/List/List'
import OrderHandle from './components/Content/Order/Handle/Handle'
import OrderCause from './components/Content/Order/Cause/Cause'
import Advertise from './components/Content/Marketing/Advertise/Advertise'
import Hot from './components/Content/Marketing/Hot/Hot'
// 路由表
class App extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/"
                    exact
                    component={Home} />
                <Route
                    path="/pers/clerks"
                    render={(props) => { return <Clerk /> }} />
                <Route
                    path="/pers/member"
                    render={() => { return <Member /> } }/>
                <Route
                    path="/food/list"
                    render={() =>  { return <FoodList /> }} />
                <Route
                    path="/food/add"
                    render={() =>  { return <Add /> }}/>
                <Route
                    path="/orders/list"
                    render={() =>{ return <OrderList /> }} />
                <Route
                    path="/orders/handle"
                    render={() => {return <OrderHandle/>}} />
                <Route
                    path="/orders/cause"
                    render={() => {return <OrderCause/>}} />
                <Route
                    path="/sale/home"
                    render={() =>  <Advertise /> } />
                <Route
                    path="/sale/new"
                    render={() => <Hot />} />
                <Route
                    path="/sale/hot"
                    render={() => <h3>热销推荐</h3>} />
                <Route
                    path="/sale/deals"
                    render={() => <h3>优惠推荐</h3>} />
                <Route
                    path="/sale/combo"
                    render={() => <h3>套餐推荐</h3>} />
                <Route
                    path="/address"
                    render={() => <h3>项目地址</h3>} />
            </Switch>
        );
    }
}

export default App;




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
import New from './components/Content/Marketing/New/New'
import Hot from './components/Content/Marketing/Hot/Hot'
import Discount from './components/Content/Marketing/Discount/Discount'
import Combos from './components/Content/Marketing/Combos/Combos'
import Location from './components/Content/Location/Location'

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
                    path="/pers"
                    exact
                    render={(props) => { return <Clerk /> }} />
                <Route
                    path="/pers/clerks"
                    render={(props) => { return <Clerk /> }} />
                <Route
                    path="/pers/member"
                    render={() => { return <Member /> } }/>
                <Route
                    path="/food"
                    exact
                    render={() =>  { return <FoodList /> }} />
                <Route
                    path="/food/list"
                    render={() =>  { return <FoodList /> }} />
                <Route
                    path="/food/add"
                    render={() =>  { return <Add /> }}/>
                <Route
                    path="/orders"
                    exact
                    render={() =>{ return <OrderList /> }} />
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
                    path="/sale"
                    exact
                    render={() =>  <Advertise /> } />
                <Route
                    path="/sale/home"
                    render={() =>  <Advertise /> } />
                <Route
                    path="/sale/new"
                    render={() => <New />} />
                <Route
                    path="/sale/hot"
                    render={() => <Hot />} />
                <Route
                    path="/sale/deals"
                    render={() => <Discount />} />
                <Route
                    path="/sale/combo"
                    render={() => <Combos />} />
                <Route
                    path="/address"
                    render={() => <Location />} />
            </Switch>
        );
    }
}

export default App;




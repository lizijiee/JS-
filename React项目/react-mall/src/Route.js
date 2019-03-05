import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, IndexRedirect } from 'react-router-dom'
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
    componentDidMount() {
        // console.log(this.props)
    }
    render() {
        return (
            <Switch>
                <Route
                    path="/"
                    exact
                    component={Home} />

                <Redirect exact 
                from="/pers" 
                to= {
                    {
                        pathname:"/pers/clerks",  
                        // search:"p1=1&p2=2",  
                        // state:{"name":"kiramario","age":26} 
                    }
                }  />

                <Route
                    path="/pers/clerks"
                    render={(props) => { return <Clerk /> }} />
                <Route
                    path="/pers/clerksDetails"
                    render={({location:{search}}) => {
                        //'?num=1'  -> let [,data]['','num=1']
                        // console.log(11111111111111)

                        // let [,data] = search.split('?');
                        return <div>21312321</div>
                        // if(data.split('=').length === 2){
                        //     return <div>21312321</div>
                        // }
                        // console.log(data.split('='))
                        
                    }} />
                    {/*  href={`/orders/clerks?num=${ele.num}`} */}
                <Route
                    path="/pers/member"
                    render={() => { return <Member /> }} />
                <Route
                    path="/food"
                    exact
                    render={() => { return <FoodList /> }} />
                <Route
                    path="/food/list"
                    render={() => { return <FoodList /> }} />
                <Route
                    path="/food/add"
                    render={() => { return <Add /> }} />
                <Route
                    path="/orders"
                    exact
                    render={() => { return <OrderList /> }} />
                <Route
                    path="/orders/list"
                    render={() => { return <OrderList /> }} />
                <Route
                    path="/orders/handle"
                    render={() => { return <OrderHandle /> }} />
                <Route
                    path="/orders/cause"
                    render={() => { return <OrderCause /> }} />
                <Route
                    path="/sale"
                    exact
                    render={() => <Advertise />} />
                <Route
                    path="/sale/home"
                    render={() => <Advertise />} />
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




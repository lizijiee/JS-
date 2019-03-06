import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Content/Content';
import Clerk from './components/Content/Person/Clerk/Clerk'
import ClerkEdit from './components/Content/Person/Clerk/EditClick/Edit'

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
                    // render={({location:{search}}) => {
                        //'?num=1'  -> let [,data]['','num=1']
                        let temp=""
                        let [,data] = search.split('?');
                        if(data.split('=').length === 2){
                            temp= <ClerkEdit/>
                        }
                        return temp
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

export default App
// 作用：把不是通过路由切换过来的组件中，将react-router-dom 的 history、location、match 三个对象传入props对象上
 
/* 
默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行this.props.history.push('/detail')跳转到对应路由的页面
然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props 
*/




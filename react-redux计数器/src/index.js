import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware,createStore} from 'redux'; 
import App from './App';
import Home from './Home';
import About from './About';
 
import {couter} from './reducers.js'   //导入函数
import { Provider}  from 'react-redux'
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
// import { Router, Route, Link } from 'react-router-dom'

import { createLogger } from 'redux-logger' //可写成logger传入中间件
// import logger from 'redux-logger';
const logger = createLogger();

if(module.hot)module.hot.accept();
 
//加入中间件的使用 
//applyMiddleware(thunk, promise, logger)
const store=createStore(couter,0,applyMiddleware(logger));//0为初始值
const render=()=> ReactDOM.render( 
 <Provider store={store}>
     {/* 组件里面传参,组件里面props里面去接收; */}
     <Router>
     <div>
        <Link to="/"><button>去首页</button> </Link>
        <Link to="/Home"><button>去home页</button> </Link>
        <Link to="/About"><button>去About页</button> </Link>
       <Route 
            path="/" 
            exact
            // strict
            // component如果放函数，一定要放有名的函数组件，不然会多次的挂载和卸载
            component={(props)=>{
                 return <App {...props}/>//传数据     
            }} />   
            {/* 最好使用render可以返回jsx或者一个组件,更喜欢通过render去判断使用需求的组件。 */}
        <Route 
            path="/Home" 
            render={(props)=>{
                return <Home {...props}/>
            }}    
        />   
        <Route 
            path="/About" 
            component={About} /> 
         
      </div>         
    </Router>
</Provider> 
, document.getElementById('root'));

render();
store.subscribe(render) //事件监听



import React, { Component} from 'react';
import { Layout} from 'antd';
// ------Content内组件引入----
import Home from './Home/Home';
 
let { Content} = Layout;

export default class Temp extends Component {
  constructor(){
    super()
   }
  render() {
    return (
        <Content 
        style={{padding: 20, margin: "20px 0 0 16px",position:"absolute",background:'#fff',top:60,width:"100%"
      }}
        >
        <Home />
        </Content>
    )
  }
}

 
 


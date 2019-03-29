import React, { Component } from 'react'

export default class Home extends Component {
 componentDidMount(){
    console.log('Home挂载')
  }
  componentWillUnmount(){
    console.log('Home卸载')
  }
  render(props) {
      console.log(111111111111)
    return (
      <div>
            Home
      </div>
    )
  }
}

 

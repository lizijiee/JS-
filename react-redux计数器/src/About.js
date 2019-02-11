import React, { Component } from 'react'
 
export default class About extends Component {
  componentDidMount(){
    console.log('About挂载')
  }
  componentWillUnmount(){
    console.log('About卸载')
  }
  render() {
        console.log(this.props)
    return (
      <div>
            About
      </div>
    )
  }
}

  
 
